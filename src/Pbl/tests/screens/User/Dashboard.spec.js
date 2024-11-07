import { MockedProvider } from '@apollo/client/testing';
import { screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import Dashboard from '@pbl/screens/UserApp/Dashboard/Dashboard';
import dashboardCatalogsQuery from '@pbl/graphql/user/queries/dashboardCatalogs';
import dashboardCoursesQuery from '@pbl/graphql/user/queries/dashboardCourses';
import { UserInfoProvider } from '@pbl/hooks/useUserInfo';
import { renderWithRouter } from '@pbl/utils/test';

const mocks = [
  {
    request: {
      query: dashboardCatalogsQuery,
      variables: {},
    },
    result: {
      data: {
        catalogs: {
          nodes: [
            {
              id: '3',
              displayName: 'Arts',
              name: 'Arts',
              description: '',
              courses: {
                nodesCount: 2,
                __typename: 'TrackPage',
              },
              thumbnailUrl: 'some-catalogs-thumbnail-url',
              __typename: 'Catalog',
              tracksCount: 3,
              tasksCount: 3,
            },
            {
              id: '2',
              displayName: 'ELA',
              name: 'ELA',
              description: '',
              courses: {
                nodesCount: 3,
                __typename: 'TrackPage',
              },
              thumbnailUrl: 'some-catalogs-thumbnail-url',
              __typename: 'Catalog',
              tracksCount: 3,
              tasksCount: 3,
            },
          ],
          nodesCount: 2,
          pagesCount: 1,
          __typename: 'CatalogPage',
        },
      },
    },
  },
  {
    request: {
      query: dashboardCoursesQuery,
      variables: { page: 1, perPage: 20 },
    },
    result: {
      data: {
        courses: {
          nodes: [
            {
              tasksCount: 1,
              description: 'Lorem ipsum dolor sit amet.',
              shortDescription: 'Short description Track #1',
              thumbnailUrl: 'some-course-thumbnail-url',
              id: '1',
              grades: [],
              imageUrl: 'http://localstack.lvh.me',
              displayName: 'Track 1',
              __typename: 'Track',
            },
            {
              tasksCount: 1,
              description: 'Lorem ipsum dolor sit amet.',
              shortDescription: 'Short description Track #2',
              thumbnailUrl: 'some-course-thumbnail-url',
              id: '2',
              grades: [],
              imageUrl: 'http://localstack.lvh.me',
              displayName: 'Track 2',
              __typename: 'Track',
            },
            {
              tasksCount: 1,
              description: 'Lorem ipsum dolor sit amet.',
              shortDescription: 'Short description Track #3',
              thumbnailUrl: 'some-course-thumbnail-url',
              id: '3',
              grades: [],
              imageUrl: 'http://localstack.lvh.me',
              displayName: 'Track 3',
              __typename: 'Track',
            },
            {
              tasksCount: 1,
              description: 'Lorem ipsum dolor sit amet.',
              shortDescription: 'Short description Track #4',
              grades: [],
              thumbnailUrl: 'some-course-thumbnail-url',
              id: '4',
              imageUrl: 'http://localstack.lvh.me',
              displayName: 'Track 4',
              __typename: 'Track',
            },
            {
              tasksCount: 1,
              description: 'Lorem ipsum dolor sit amet.',
              grades: [],
              shortDescription: 'Short description Track #5',
              thumbnailUrl: 'some-course-thumbnail-url',
              id: '5',
              imageUrl: 'http://localstack.lvh.me',
              displayName: 'Track 5',
              __typename: 'Track',
            },
          ],
          nodesCount: 5,
          pagesCount: 1,
          __typename: 'TrackPage',
        },
      },
    },
  },
  {
    request: {
      query: dashboardCoursesQuery,
      variables: {},
    },
    result: {
      data: {
        courses: {
          nodes: [
            {
              tasksCount: 2,
              description: 'Lorem ipsum dolor sit amet.',
              shortDescription: 'Short description Track #1',
              thumbnailUrl: 'some-course-thumbnail-url',
              grades: [],
              id: '1',
              imageUrl: 'http://localstack.lvh.me',
              displayName: 'Track 1',
              __typename: 'Track',
            },
            {
              tasksCount: 2,
              description: 'Lorem ipsum dolor sit amet.',
              shortDescription: 'Short description Track #2',
              thumbnailUrl: 'some-course-thumbnail-url',
              grades: [],
              id: '2',
              imageUrl: 'http://localstack.lvh.me',
              displayName: 'Track 2',
              __typename: 'Track',
            },
            {
              tasksCount: 2,
              description: 'Lorem ipsum dolor sit amet.',
              shortDescription: 'Short description Track #3',
              thumbnailUrl: 'some-course-thumbnail-url',
              grades: [],
              id: '3',
              imageUrl: 'http://localstack.lvh.me',
              displayName: 'Track 3',
              __typename: 'Track',
            },
            {
              tasksCount: 2,
              description: 'Lorem ipsum dolor sit amet.',
              shortDescription: 'Short description Track #4',
              thumbnailUrl: 'some-course-thumbnail-url',
              grades: [],
              id: '4',
              imageUrl: 'http://localstack.lvh.me',
              displayName: 'Track 4',
              __typename: 'Track',
            },
            {
              tasksCount: 2,
              description: 'Lorem ipsum dolor sit amet.',
              shortDescription: 'Short description Track #5',
              thumbnailUrl: 'some-course-thumbnail-url',
              grades: [],
              id: '5',
              imageUrl: 'http://localstack.lvh.me',
              displayName: 'Track 5',
              __typename: 'Track',
            },
          ],
          nodesCount: 5,
          pagesCount: 1,
          __typename: 'TrackPage',
        },
      },
    },
  },
];

const mockedStandardSets = [
  { id: '1', name: 'Set1', setId: 'S1' },
  { id: '2', name: 'Set2', setId: 'S2' },
  { id: '3', name: 'Set3', setId: 'S3' },
];
const initialState = {
  session: {
    loginError: {},
    user: null,
  },
};
const store = configureMockStore([thunk])(initialState);

const renderUserDashboard = () => {
  const utils = renderWithRouter(
    <Provider store={store}>
      <MockedProvider mocks={mocks}>
        <UserInfoProvider
          value={{
            userInfo: {
              availableTracksCount: 5,
              availableTasksCount: 1,
              uuid: 'secret-uuid',
              standardSets: mockedStandardSets,
              availableResources: {
                tasks: [
                  {
                    id: '1',
                  },
                ],
              },
            },
          }}>
          <Dashboard />
        </UserInfoProvider>
      </MockedProvider>
    </Provider>
  );

  return { ...utils };
};

describe('UserDashboard', () => {
  it('renders spinner before response is resolved', async () => {
    renderUserDashboard();

    expect(screen.getByTestId('track-list-skeleton')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Track 1')).toBeInTheDocument();
    });
  });

  it('renders catalogs list with "All Courses" card first', async () => {
    const { getAllByTestId } = renderUserDashboard();

    await waitFor(() => {
      const catalogItemsNames = getAllByTestId(/dashboard-catalog-item-name/);
      const catalogItemsCoursesInfo = getAllByTestId(/dashboard-catalog-item-courses-info/);

      expect(catalogItemsNames).toHaveLength(3);
      expect(catalogItemsCoursesInfo).toHaveLength(6);

      expect(catalogItemsNames[0]).toHaveTextContent(/All Courses/i);
      expect(catalogItemsNames[1]).toHaveTextContent(/Arts/i);
      expect(catalogItemsNames[2]).toHaveTextContent(/ELA/i);
      expect(catalogItemsCoursesInfo[0]).toHaveTextContent(/5 courses/i);
      expect(catalogItemsCoursesInfo[1]).toHaveTextContent(/1 Project/i);
      expect(catalogItemsCoursesInfo[2]).toHaveTextContent(/3 courses/i);
      expect(catalogItemsCoursesInfo[3]).toHaveTextContent(/3 Projects/i);
      expect(catalogItemsCoursesInfo[4]).toHaveTextContent(/3 courses/i);
      expect(catalogItemsCoursesInfo[5]).toHaveTextContent(/3 Projects/i);
    });
  });

  it('renders courses list correctly', async () => {
    renderUserDashboard();

    const trackCards = await screen.findAllByRole('listitem');

    expect(trackCards).toHaveLength(5);

    expect(trackCards[0]).toHaveTextContent(/Track 1/i);
    expect(trackCards[1]).toHaveTextContent(/Track 2/i);
    expect(trackCards[2]).toHaveTextContent(/Track 3/i);
    expect(trackCards[3]).toHaveTextContent(/Track 4/i);
    expect(trackCards[4]).toHaveTextContent(/Track 5/i);
  });
});
