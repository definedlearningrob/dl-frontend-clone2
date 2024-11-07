import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, screen, waitFor, within } from '@testing-library/dom';
import { OpportunityTypes } from '@graphql/dc/shared/types';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { OPPORTUNITIES_QUERY, TOpportunitiesData } from '@dc/graphql/user/queries/opportunities';
import { OPPORTUNITY_TYPE, VISIBILITY_SCOPE } from '@dc/resources/enums';
import cacheConfig from '@dc/graphql/cacheConfig';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { userInfoMock } from '@dc/tests/mocks/userMocks';

import { FilterProvider } from '@shared/components/FilterProvider/FilterProvider';

import { OpportunitiesList } from './OpportunitiesList';

const fetchMoreOpportunities = jest.fn();

const opportunities: TOpportunitiesData['opportunities']['nodes'] = [
  {
    id: '1',
    name: 'Opportunity 1',
    opportunityType: OpportunityTypes.PRACTICUM,
    createdAt: '2023-10-01',
    periodEnd: '2023-10-04',
    periodStart: '2023-09-01',
    deadline: '2023-08-15',
    visibilityScope: VISIBILITY_SCOPE.ALL,
    hasPendingApplications: false,
    imageUrl: '',
    thumbnailUrl: '',
    virtualInternship: null,
    entities: [],
    pathways: [{ name: 'Animal Systems' }],
    partner: { id: '1', name: 'Opportunity partner' },
    imageFitToContainer: false,
  },
  {
    id: '2',
    name: 'Opportunity 2',
    opportunityType: OpportunityTypes.OTHER,
    createdAt: '2023-10-01',
    periodEnd: '2023-05-01',
    periodStart: '2023-04-01',
    deadline: '2023-03-15',
    visibilityScope: VISIBILITY_SCOPE.ALL,
    hasPendingApplications: true,
    imageUrl: '',
    thumbnailUrl: '',
    virtualInternship: null,
    entities: [{ uuid: '1' }],
    pathways: [{ name: 'Natural Resources Systems' }, { name: 'Power' }, { name: 'Plant Systems' }],
    partner: null,
    imageFitToContainer: true,
  },
  {
    id: '3',
    name: 'Opportunity 3',
    opportunityType: OpportunityTypes.APPRENTICESHIP,
    createdAt: '2023-10-01',
    periodEnd: '2023-10-04',
    periodStart: '2023-09-01',
    deadline: '2023-08-15',
    visibilityScope: VISIBILITY_SCOPE.ALL,
    hasPendingApplications: false,
    imageUrl: '',
    thumbnailUrl: '',
    virtualInternship: null,
    entities: [{ uuid: '1' }, { uuid: '2' }],
    partner: { id: '2', name: 'Opportunity partner 2' },
    pathways: [{ name: 'Animal Systems' }, { name: 'Power' }],
    imageFitToContainer: true,
  },
];

const mocks = [
  {
    request: {
      query: OPPORTUNITIES_QUERY,
      variables: { page: 1, perPage: 25, filter: {} },
    },
    result: {
      data: {
        opportunities: {
          nodesCount: 4,
          pagesCount: 2,
          nodes: opportunities,
        },
      },
    },
  },
  {
    request: {
      query: OPPORTUNITIES_QUERY,
      variables: { page: 1, perPage: 25 },
    },
    result: {
      data: {
        opportunities: {
          nodesCount: 4,
          pagesCount: 2,
          nodes: opportunities,
        },
      },
    },
  },
  {
    request: {
      query: OPPORTUNITIES_QUERY,
      variables: { page: 2, perPage: 25, infiniteScroll: true },
    },
    result() {
      fetchMoreOpportunities();

      return {
        data: {
          opportunities: {
            nodesCount: 4,
            pagesCount: 2,
            nodes: [
              {
                id: '4',
                name: 'Opportunity 4',
                opportunityType: OPPORTUNITY_TYPE.CLINICAL_EXPERIENCE,
                createdAt: '2023-10-01',
                periodEnd: '2022-10-04',
                periodStart: '2022-09-01',
                deadline: '2022-08-15',
                visibilityScope: VISIBILITY_SCOPE.ALL,
                hasPendingApplications: true,
              },
            ],
          },
        },
      };
    },
  },
  userInfoMock,
];

const renderComponent = (canManageOpportunities = false) =>
  renderWithRouterAndReduxProvider(
    <UserInfoProvider value={{ userInfo: userInfoMock.result.data.userInfo }}>
      <MockedProvider cache={cacheConfig} mocks={mocks}>
        <FilterProvider initialFilters={{}}>
          <OpportunitiesList canManageOpportunities={canManageOpportunities} />
        </FilterProvider>
      </MockedProvider>
    </UserInfoProvider>
  );

describe('OpportunitiesList', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2023-04-01'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should display data in the table', async () => {
    const { container } = renderComponent();

    const [_tableHead, tableBody] = await screen.findAllByRole('rowgroup');
    const rows = await within(tableBody).findAllByRole('row');

    expect(rows).toHaveLength(3);
    expect(rows[0]).toHaveTextContent('Opportunity 1');
    expect(rows[0]).not.toHaveTextContent('Pending applications');
    expect(rows[1]).toHaveTextContent('Opportunity 2');
    expect(rows[1]).not.toHaveTextContent('Pending applications');
    expect(rows[2]).toHaveTextContent('Opportunity 3');
    expect(rows[2]).not.toHaveTextContent('Pending applications');

    expect(container).toMatchSnapshot();
  });

  it.skip('should fetch more data after scrolling down', async () => {
    renderComponent();

    const table = await screen.findByRole('table');
    const [_tableHead, tableBody] = await screen.findAllByRole('rowgroup');
    fireEvent.scroll(table);

    await waitFor(() => expect(fetchMoreOpportunities).toHaveBeenCalledTimes(1));

    const rows = within(tableBody).getAllByRole('row');

    expect(rows).toHaveLength(4);
    expect(rows[0]).toHaveTextContent('Opportunity 1');
    expect(rows[1]).toHaveTextContent('Opportunity 2');
    expect(rows[2]).toHaveTextContent('Opportunity 3');
    expect(rows[3]).toHaveTextContent('Opportunity 4');
    expect(rows[3]).not.toHaveTextContent('Pending applications');
  });

  describe('with canManageOpportunities set as true', () => {
    it('should display data in the table', async () => {
      const { container } = renderComponent(true);

      const [_tableHead, tableBody] = await screen.findAllByRole('rowgroup');
      const rows = await within(tableBody).findAllByRole('row');

      expect(rows).toHaveLength(3);
      expect(rows[0]).toHaveTextContent('Opportunity 1');
      expect(rows[0]).not.toHaveTextContent('Pending applications');
      expect(rows[1]).toHaveTextContent('Opportunity 2');
      expect(rows[1]).toHaveTextContent('Pending applications');
      expect(rows[2]).toHaveTextContent('Opportunity 3');
      expect(rows[2]).not.toHaveTextContent('Pending applications');

      expect(container).toMatchSnapshot();
    });
  });
});
