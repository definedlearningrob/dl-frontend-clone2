import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { cloneDeep, range } from 'lodash-es';

import OPPORTUNITIES_QUERY from '@dc/graphql/student/queries/opportunities';
import { OPPORTUNITY_TAGS } from '@dc/graphql/shared/queries/opportunityTags';
import { OPPORTUNITY_APPLICATION_STATUS, OPPORTUNITY_TYPE } from '@dc/resources/enums';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import CLUSTERS from '@dc/graphql/shared/queries/clusters';
import cacheConfig from '@dc/graphql/cacheConfig';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { studentInfoMock } from '@dc/tests/mocks/studentMocks';

import { OpportunitiesListCard } from './OpportunitiesListCard';

const opportunitiesMocks = [
  {
    applicationStatus: OPPORTUNITY_APPLICATION_STATUS.STARTED,
    deadline: '2021-05-31T00:00:00.000Z',
    id: '1',
    imageUrl: 'https://picsum.photos/600/300',
    isFavorite: true,
    name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    opportunityType: OPPORTUNITY_TYPE.INTERNSHIP,
    periodEnd: '2021-05-31T00:00:00.000Z',
    periodStart: '2021-05-31T00:00:00.000Z',
    tags: ['test'],
    pathways: [{ id: '1', name: 'Pathway 1' }],
    virtualInternship: null,
    isRecommended: false,
    partner: null,
    imageFitToContainer: false,
  },
  {
    applicationStatus: OPPORTUNITY_APPLICATION_STATUS.PENDING,
    deadline: '2021-05-31T00:00:00.000Z',
    id: '2',
    imageUrl: 'https://picsum.photos/600/300',
    isFavorite: false,
    name: 'Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel risus commodo viverra maecenas',
    opportunityType: OPPORTUNITY_TYPE.JOB_SHADOW,
    periodEnd: '2021-05-31T00:00:00.000Z',
    periodStart: '2021-05-31T00:00:00.000Z',
    tags: ['test'],
    pathways: [{ id: '1', name: 'Pathway 1' }],
    virtualInternship: null,
    isRecommended: false,
    partner: null,
    imageFitToContainer: false,
  },
  {
    applicationStatus: OPPORTUNITY_APPLICATION_STATUS.ACCEPTED,
    deadline: '2021-05-31T00:00:00.000Z',
    id: '3',
    imageUrl: 'https://picsum.photos/600/300',
    isFavorite: false,
    name: 'Libero id faucibus nisl tincidunt eget nullam non nisi est sit amet facilisis magna etiam',
    opportunityType: OPPORTUNITY_TYPE.PRACTICUM,
    createdAt: '2023-10-01',
    periodEnd: '2021-05-31T00:00:00.000Z',
    periodStart: '2021-05-31T00:00:00.000Z',
    tags: ['tag#1'],
    pathways: [{ id: '1', name: 'Pathway 1' }],
    virtualInternship: null,
    isRecommended: false,
    partner: null,
    imageFitToContainer: true,
  },
  {
    id: '4',
    deadline: '2021-05-31T00:00:00.000Z',
    name: 'Turpis in eu mi bibendum neque egestas congue quisque egestas diam in arcu cursus euismod',
    imageUrl: 'https://picsum.photos/600/300',
    opportunityType: OPPORTUNITY_TYPE.VIRTUAL_INTERNSHIP,
    isFavorite: false,
    applicationStatus: OPPORTUNITY_APPLICATION_STATUS.REJECTED,
    createdAt: '2023-10-01',
    periodStart: '2021-05-31T00:00:00.000Z',
    periodEnd: '2021-05-31T00:00:00.000Z',
    pathways: [{ id: '1', name: 'Pathway 1' }],
    virtualInternship: null,
    isRecommended: false,
    partner: null,
    imageFitToContainer: true,
  },
];

const clustersMock = {
  request: {
    query: CLUSTERS,
  },
  result: {
    data: {
      clusters: [
        {
          id: '1',
          name: 'Cluster',
          pathways: [
            {
              id: '1',
              name: 'Pathway',
            },
          ],
        },
      ],
    },
  },
};

const opportunityTagsMock = {
  request: {
    query: OPPORTUNITY_TAGS,
  },
  result: {
    data: {
      opportunityTags: ['test', 'tag#1'],
    },
  },
};

const defaultMocks = [
  clustersMock,
  opportunityTagsMock,
  {
    request: {
      query: OPPORTUNITIES_QUERY,
      variables: { page: 1, perPage: 12, infiniteScroll: true },
    },
    result: {
      data: {
        opportunities: {
          nodes: opportunitiesMocks,
          nodesCount: 4,
          pagesCount: 1,
        },
      },
    },
  },
];

const fetchOpportunitiesSpy = jest.fn();

const twoPagesMocks = [
  clustersMock,
  ...range(2).map((_, pageIndex) => ({
    request: {
      query: OPPORTUNITIES_QUERY,
      variables: { page: pageIndex + 1, perPage: 12, infiniteScroll: true },
    },
    result() {
      fetchOpportunitiesSpy({ pageIndex });

      return {
        data: {
          opportunities: {
            nodes: range(12).map((_, index) => ({
              ...cloneDeep(opportunitiesMocks[index % opportunitiesMocks.length]),
              id: `${index + 1 + pageIndex * 12}`,
            })),
            nodesCount: 24,
            pagesCount: 2,
          },
        },
      };
    },
  })),
];

const emptyMocks = [
  clustersMock,
  {
    request: {
      query: OPPORTUNITIES_QUERY,
      variables: { page: 1, perPage: 12, infiniteScroll: true },
    },
    result: {
      data: {
        opportunities: {
          nodes: [],
          nodesCount: 0,
          pagesCount: 0,
        },
      },
    },
  },
];

const renderComponent = (mocks?: MockedResponse[]) => {
  renderWithRouterAndReduxProvider(
    <MockedProvider cache={cacheConfig} mocks={mocks}>
      <UserInfoProvider value={{ userInfo: studentInfoMock.result.data.userInfo }}>
        <OpportunitiesListCard />
      </UserInfoProvider>
    </MockedProvider>,
    { initialState: { session: { loginError: {}, user: { type: 'student' } } } }
  );
};

describe('OpportunitiesListCard', () => {
  it('displays empty state message when there are no opportunities', async () => {
    renderComponent(emptyMocks);

    expect(await screen.findByText('No opportunities found')).toBeInTheDocument();
    expect(
      screen.getByText('Try to change filters or search for another opportunity.')
    ).toBeInTheDocument();
  });

  it('renders opportunity cards correctly when there is only one page', async () => {
    renderComponent(defaultMocks);

    const nameFilter = await screen.findByRole('textbox', { name: 'Search:' });
    expect(nameFilter).toBeInTheDocument();

    const opportunityCards = await screen.findAllByRole('listitem');
    expect(opportunityCards).toHaveLength(4);

    const [clusterSelect, typeSelect] = screen.getAllByRole('combobox');
    expect(clusterSelect).toBeInTheDocument();
    expect(typeSelect).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tags' })).toBeInTheDocument();

    expect(screen.queryByRole('button', { name: 'Show More' })).not.toBeInTheDocument();
  });

  it.skip('renders next opportunities page after clicking "Show More" button', async () => {
    renderComponent(twoPagesMocks);

    expect(await screen.findAllByRole('listitem')).toHaveLength(12);
    await waitFor(() => {
      expect(fetchOpportunitiesSpy).toHaveBeenCalledTimes(1);
    });
    expect(fetchOpportunitiesSpy).toHaveBeenCalledWith({ pageIndex: 0 });

    fetchOpportunitiesSpy.mockClear();

    const opportunitiesList = await screen.findByRole('list');
    fireEvent.scroll(opportunitiesList, { target: { scrollY: 500 } });

    await waitFor(() => {
      expect(fetchOpportunitiesSpy).toHaveBeenCalledTimes(1);
    });
    expect(fetchOpportunitiesSpy).toHaveBeenCalledWith({ pageIndex: 1 });
  });
});
