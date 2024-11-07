import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { screen, waitFor, within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { act } from '@testing-library/react';
import { OpportunityTypes, PartnerStatuses } from '@graphql/dc/shared/types';
import { UserPartnerOptionsQuery } from '@graphql/dc/users/operations';
import { UserPartnerOptionsDocument } from '@graphql/dc/users/hooks';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import CLUSTERS, { TClustersData } from '@dc/graphql/shared/queries/clusters';
import { OPPORTUNITY_TAGS, TOpportunityTagsData } from '@dc/graphql/shared/queries/opportunityTags';
import { OPPORTUNITIES_QUERY, TOpportunitiesData } from '@dc/graphql/user/queries/opportunities';
import { Roles, VISIBILITY_SCOPE } from '@dc/resources/enums';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { userInfoMock } from '@dc/tests/mocks/userMocks';
import { ENTITIES_WITH_CHILDREN } from '@dc/graphql/user/queries/entitiesWithChildrens';

import { OpportunitiesScreen } from './OpportunitiesScreen';

const fetchOpportunitiesWithoutFiltersSpy = jest.fn();
const filterOpportunitiesSpy = jest.fn();
const entitiesSpy = jest.fn();

const opportunitiesResponse: { data: TOpportunitiesData } = {
  data: {
    opportunities: {
      nodesCount: 2,
      pagesCount: 1,
      nodes: [
        {
          id: '1',
          name: 'Opportunity 1',
          opportunityType: OpportunityTypes.PRACTICUM,
          createdAt: '2023-10-01',
          periodEnd: '2023-10-04',
          periodStart: '2023-09-01',
          deadline: '2023-08-15',
          visibilityScope: VISIBILITY_SCOPE.ENTITY,
          hasPendingApplications: true,
          thumbnailUrl: 'https://www.example.com/image.png',
          imageUrl: 'https://www.example.com/image.png',
          virtualInternship: null,
          entities: [{ uuid: '1111-2222-3333-4444' }],
          pathways: [{ name: 'Administrative Support' }, { name: 'Business Finance' }],
          partner: { id: '1', name: 'University of Illnois Hospital' },
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
          hasPendingApplications: false,
          thumbnailUrl: 'https://www.example.com/image.png',
          imageUrl: 'https://www.example.com/image.png',
          virtualInternship: null,
          entities: [],
          pathways: [{ name: 'Animal Systems' }],
          partner: null,
          imageFitToContainer: true,
        },
      ],
    },
  },
};

const emptyOpportunitiesResponse = {
  data: {
    opportunities: {
      nodes: [],
      nodesCount: 0,
      pagesCount: 0,
    },
  },
};

const getFilteredOpportunitiesResponse = (opportunityName: string) => ({
  data: {
    opportunities: {
      nodesCount: 1,
      pagesCount: 1,
      nodes: [
        {
          id: '1',
          name: opportunityName,
          opportunityType: OpportunityTypes.PRACTICUM,
          periodEnd: '2023-10-04',
          periodStart: '2023-09-01',
          deadline: '2023-08-15',
          createdAt: '2023-10-01',
          visibilityScope: VISIBILITY_SCOPE.ALL,
          hasPendingApplications: true,
          imageUrl: 'https://www.example.com/image.png',
          thumbnailUrl: 'https://www.example.com/image.png',
          virtualInternship: null,
          entities: [{ uuid: '1111-2222-3333-4444' }],
          pathways: [{ name: 'Administrative Support' }, { name: 'Business Finance' }],
          partner: { id: '1', name: 'University of Illnois Hospital' },
          imageFitToContainer: false,
        },
      ],
    },
  },
});

const opportunitiesMock: MockedResponse<TOpportunitiesData> = {
  request: {
    query: OPPORTUNITIES_QUERY,
    variables: {
      page: 1,
      perPage: 25,
      filter: {
        includeGlobal: true,
        nameCont: '',
        pathwaysIdIn: [],
        typeIn: [],
        partnersIdIn: [],
        tagsContain: [],
        entitiesUuidIn: [],
      },
    },
  },
  result: opportunitiesResponse,
};

const emptyOpportunitiesMock: MockedResponse<TOpportunitiesData> = {
  request: {
    query: OPPORTUNITIES_QUERY,
    variables: {
      page: 1,
      perPage: 25,
      filter: {
        includeGlobal: true,
        nameCont: '',
        pathwaysIdIn: [],
        typeIn: [],
        partnersIdIn: [],
        tagsContain: [],
        entitiesUuidIn: [],
      },
    },
  },
  result: emptyOpportunitiesResponse,
};

const searchOpportunitiesMock: MockedResponse<TOpportunitiesData> = {
  request: {
    query: OPPORTUNITIES_QUERY,
    variables: {
      page: 1,
      perPage: 25,
      filter: {
        includeGlobal: true,
        nameCont: 'search',
        pathwaysIdIn: [],
        typeIn: [],
        partnersIdIn: [],
        tagsContain: [],
        entitiesUuidIn: [],
      },
    },
  },
  result() {
    filterOpportunitiesSpy();

    return getFilteredOpportunitiesResponse('Searched opportunity');
  },
};

const emptySearchOpportunitiesMock: MockedResponse<TOpportunitiesData> = {
  request: {
    query: OPPORTUNITIES_QUERY,
    variables: {
      page: 1,
      perPage: 25,
      filter: {
        includeGlobal: true,
        nameCont: 'test123',
        pathwaysIdIn: [],
        typeIn: [],
        partnersIdIn: [],
        tagsContain: [],
        entitiesUuidIn: [],
      },
    },
  },
  result: emptyOpportunitiesResponse,
};

const opportunitiesFilteredByClusterMock: MockedResponse<TOpportunitiesData> = {
  request: {
    query: OPPORTUNITIES_QUERY,
    variables: {
      page: 1,
      perPage: 25,
      filter: {
        includeGlobal: true,
        nameCont: '',
        pathwaysIdIn: ['1', '2'],
        typeIn: [],
        partnersIdIn: [],
        tagsContain: [],
        entitiesUuidIn: [],
      },
    },
  },
  result() {
    filterOpportunitiesSpy();

    return getFilteredOpportunitiesResponse('Opportunity filtered by cluster');
  },
};

const opportunitiesFilteredByPathwayMock: MockedResponse<TOpportunitiesData> = {
  request: {
    query: OPPORTUNITIES_QUERY,
    variables: {
      page: 1,
      perPage: 25,
      filter: {
        includeGlobal: true,
        nameCont: '',
        pathwaysIdIn: ['1'],
        typeIn: [],
        partnersIdIn: [],
        tagsContain: [],
        entitiesUuidIn: [],
      },
    },
  },
  result() {
    filterOpportunitiesSpy();

    return getFilteredOpportunitiesResponse('Opportunity filtered by pathway');
  },
};

const opportunitiesFilteredByTypeMock: MockedResponse<TOpportunitiesData> = {
  request: {
    query: OPPORTUNITIES_QUERY,
    variables: {
      page: 1,
      perPage: 25,
      filter: {
        includeGlobal: true,
        nameCont: '',
        pathwaysIdIn: [],
        typeIn: ['PRACTICUM'],
        partnersIdIn: [],
        tagsContain: [],
        entitiesUuidIn: [],
      },
    },
  },
  result() {
    filterOpportunitiesSpy();

    return getFilteredOpportunitiesResponse('Opportunity filtered by type');
  },
};

export const entitiesMock = {
  request: {
    query: ENTITIES_WITH_CHILDREN,
    variables: {
      page: 1,
      perPage: 10,
      filter: { nameCont: '' },
    },
  },
  result() {
    entitiesSpy();

    return {
      data: {
        entities: {
          pagesCount: 1,
          nodesCount: 5,
          nodes: [
            {
              uuid: 'test-entity-uuid',
              name: 'Test Middle School',
              children: {
                nodes: [
                  {
                    uuid: 'test-entity-uuid-nested',
                    name: 'Test Middle School Nested',
                    children: [],
                  },
                ],
              },
            },
          ],
        },
      },
    };
  },
};

const opportunitiesFilteredByEntityMock: MockedResponse<TOpportunitiesData> = {
  request: {
    query: OPPORTUNITIES_QUERY,
    variables: {
      page: 1,
      perPage: 25,
      filter: {
        includeGlobal: true,
        nameCont: '',
        pathwaysIdIn: [],
        typeIn: [],
        partnersIdIn: [],
        tagsContain: [],
        entitiesUuidIn: ['test-entity-uuid'],
      },
    },
  },
  result() {
    filterOpportunitiesSpy();

    return getFilteredOpportunitiesResponse('Opportunity filtered by entity');
  },
};

const opportunitiesFilteredByTagsMock: MockedResponse<TOpportunitiesData> = {
  request: {
    query: OPPORTUNITIES_QUERY,
    variables: {
      page: 1,
      perPage: 25,
      filter: {
        includeGlobal: true,
        nameCont: '',
        pathwaysIdIn: [],
        typeIn: [],
        partnersIdIn: [],
        tagsContain: ['test'],
        entitiesUuidIn: [],
      },
    },
  },
  result() {
    filterOpportunitiesSpy();

    return getFilteredOpportunitiesResponse('Opportunity with test tag');
  },
};

const opportunitiesWithEmptyFiltersMock: MockedResponse<TOpportunitiesData> = {
  request: {
    query: OPPORTUNITIES_QUERY,
    variables: {
      page: 1,
      perPage: 25,
      filter: {
        includeGlobal: true,
        nameCont: '',
        pathwaysIdIn: [],
        typeIn: [],
        partnersIdIn: [],
        tagsContain: [],
        entitiesUuidIn: [],
      },
    },
  },
  result() {
    fetchOpportunitiesWithoutFiltersSpy();

    return opportunitiesResponse;
  },
};

const clustersMock: MockedResponse<TClustersData> = {
  request: {
    query: CLUSTERS,
  },
  result: {
    data: {
      clusters: [
        {
          id: '1',
          name: 'Test cluster',
          pathways: [
            {
              id: '1',
              name: 'First pathway',
            },
            {
              id: '2',
              name: 'Second pathway',
            },
          ],
        },
      ],
    },
  },
};

const partnersMock: MockedResponse<UserPartnerOptionsQuery> = {
  request: {
    query: UserPartnerOptionsDocument,
    variables: { perPage: 20, infiniteScroll: true },
  },
  result: {
    data: {
      partners: {
        nodes: [
          { id: '1', name: 'University of Illnois Hospital', status: PartnerStatuses.PUBLISHED },
          { id: '2', name: 'Software House', status: PartnerStatuses.PUBLISHED },
        ],
        pagesCount: 1,
      },
    },
  },
};

const opportunityTagsMock: MockedResponse<TOpportunityTagsData> = {
  request: {
    query: OPPORTUNITY_TAGS,
  },
  result: {
    data: {
      opportunityTags: ['test', 'tag#1'],
    },
  },
};

const commonMocks = [clustersMock, opportunityTagsMock, partnersMock, entitiesMock];

const renderComponent = (customMocks: MockedResponse[] = []) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider mocks={[...commonMocks, ...customMocks]}>
      <UserInfoProvider
        value={{
          userInfo: {
            ...userInfoMock.result.data.userInfo,
            permissions: {
              wblAdmin: false,
              counselor: false,
              canImpersonate: false,
              canBrowseReports: false,
            },
            role: Roles.TEACHER,
          },
        }}>
        <OpportunitiesScreen />
      </UserInfoProvider>
    </MockedProvider>
  );

describe('OpportunitiesScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2023-06-01'));

    const { container } = renderComponent([opportunitiesMock]);

    await screen.findByRole('table');

    await waitFor(() => {
      expect(entitiesSpy).toHaveBeenCalledTimes(1);
    });

    expect(container).toMatchSnapshot();

    jest.useRealTimers();
  });

  it('displays proper message when data is empty', async () => {
    const { container } = renderComponent([emptyOpportunitiesMock, emptyOpportunitiesMock]);

    const emptyText = await screen.findByText('There are no opportunities');
    expect(emptyText).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('filters opportunities by name', async () => {
    jest.useFakeTimers();
    renderComponent([opportunitiesMock, searchOpportunitiesMock]);

    await screen.findByText('Opportunity Name');
    const searchInput = await screen.findByRole('textbox', { name: 'Search:' });
    userEvent.paste(searchInput, 'search');

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(filterOpportunitiesSpy).toHaveBeenCalledTimes(1);
    });

    const [_tableHead, tableBody] = await screen.findAllByRole('rowgroup');
    const rows = within(tableBody).getAllByRole('row');
    expect(rows).toHaveLength(1);
    expect(rows[0]).toHaveTextContent('Searched opportunity');

    jest.useRealTimers();
  });

  it('filters opportunities by clusters and pathway', async () => {
    renderComponent([opportunitiesMock, opportunitiesFilteredByClusterMock]);

    await screen.findByText('Opportunity Name');
    const clustersSelectInput = await screen.findByLabelText(/Cluster and pathway:/);

    userEvent.click(clustersSelectInput);

    const cluster = await screen.findByText('Test cluster');
    userEvent.click(cluster);

    await waitFor(() => {
      expect(filterOpportunitiesSpy).toHaveBeenCalledTimes(1);
    });

    const selectedCluster = screen.getByTestId('select-chip');
    expect(selectedCluster).toHaveTextContent('2 selected');

    const [_tableHead, tableBody] = await screen.findAllByRole('rowgroup');
    const rows = within(tableBody).getAllByRole('row');

    expect(rows).toHaveLength(1);
    expect(rows[0]).toHaveTextContent('Opportunity filtered by cluster');
  });

  it('displays pathway name in the chip when only one is selected', async () => {
    renderComponent([opportunitiesMock, opportunitiesFilteredByPathwayMock]);

    await screen.findByText('Opportunity Name');
    const clustersSelectInput = await screen.findByLabelText(/Cluster and pathway/);

    userEvent.click(clustersSelectInput);

    const expandButton = await screen.findByLabelText('Expand');
    userEvent.click(expandButton);
    userEvent.click(await screen.findByText('First pathway'));

    await waitFor(() => {
      expect(filterOpportunitiesSpy).toHaveBeenCalledTimes(1);
    });

    const selectedPathway = screen.getByTestId('select-chip');
    expect(selectedPathway).toHaveTextContent('First pathway');
  });

  it('filters opportunities by type', async () => {
    renderComponent([opportunitiesMock, opportunitiesFilteredByTypeMock]);

    await screen.findByText('Opportunity Name');
    const typeSelectInput = await screen.findByLabelText(/Type/);

    userEvent.type(typeSelectInput, 'Practicum{enter}');

    await waitFor(() => {
      expect(filterOpportunitiesSpy).toHaveBeenCalledTimes(1);
    });

    const [_tableHead, tableBody] = screen.getAllByRole('rowgroup');
    const rows = within(tableBody).getAllByRole('row');

    expect(rows).toHaveLength(1);
    expect(rows[0]).toHaveTextContent('Opportunity filtered by type');
  });

  it('filters opportunities by tags', async () => {
    renderComponent([opportunitiesMock, opportunitiesFilteredByTagsMock]);

    await screen.findByText('Opportunity Name');
    const quickFiltersButton = await screen.findByRole('button', { name: 'Tags' });
    userEvent.click(quickFiltersButton);

    const quickFiltersSection = await screen.findByTestId('quick-filter-tags');
    await waitFor(() => {
      expect(quickFiltersSection.children).toHaveLength(2);
    });

    const testTag = within(quickFiltersSection).getByText('test');
    userEvent.click(testTag);

    await waitFor(() => {
      expect(filterOpportunitiesSpy).toHaveBeenCalledTimes(1);
    });

    const [_tableHead, tableBody] = screen.getAllByRole('rowgroup');
    const rows = within(tableBody).getAllByRole('row');

    expect(rows).toHaveLength(1);
    expect(rows[0]).toHaveTextContent('Opportunity with test tag');
  });

  it('filters opportunities by entity', async () => {
    renderComponent([opportunitiesMock, opportunitiesFilteredByEntityMock]);

    await screen.findByText('Opportunity Name');
    const typeSelectInput = await screen.findByLabelText(/Entity:/);

    userEvent.type(typeSelectInput, 'Test Middle School{enter}');

    await waitFor(() => {
      expect(filterOpportunitiesSpy).toHaveBeenCalledTimes(1);
    });

    const [_tableHead, tableBody] = screen.getAllByRole('rowgroup');
    const rows = within(tableBody).getAllByRole('row');

    expect(rows).toHaveLength(1);
    expect(rows[0]).toHaveTextContent('Opportunity filtered by entity');
  });

  it('clears filters after clicking "Clear all" button', async () => {
    renderComponent([
      opportunitiesMock,
      opportunitiesFilteredByTypeMock,
      opportunitiesWithEmptyFiltersMock,
    ]);

    const typeSelectInput = await screen.findByLabelText(/Type/);
    userEvent.click(typeSelectInput);

    const practicumOption = await screen.findByRole('option', { name: 'Practicum' });
    userEvent.click(practicumOption);

    await waitFor(() => {
      expect(filterOpportunitiesSpy).toHaveBeenCalledTimes(1);
    });

    const clearAllButton = screen.getByLabelText('Clear all');

    userEvent.click(clearAllButton);

    await waitFor(() => {
      expect(fetchOpportunitiesWithoutFiltersSpy).toHaveBeenCalledTimes(1);
    });

    const [_tableHead, tableBody] = screen.getAllByRole('rowgroup');
    const rows = within(tableBody).getAllByRole('row');

    expect(await screen.findByText('Opportunity 1')).toBeInTheDocument();
    expect(await screen.findByText('Opportunity 2')).toBeInTheDocument();
    await waitFor(() => {
      expect(rows).toHaveLength(2);
    });
  });

  it('displays proper message when no opportunities match passed filters', async () => {
    jest.useFakeTimers();
    renderComponent([opportunitiesMock, emptySearchOpportunitiesMock]);

    await screen.findByText('Opportunity Name');
    const searchInput = await screen.findByRole('textbox', { name: 'Search:' });
    userEvent.paste(searchInput, 'test123');

    jest.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(
        screen.getByText('There are no opportunities that match your current filter')
      ).toBeInTheDocument();
    });

    jest.useRealTimers();
  });
});
