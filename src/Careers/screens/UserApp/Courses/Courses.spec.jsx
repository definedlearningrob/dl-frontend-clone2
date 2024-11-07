import { MockedProvider } from '@apollo/client/testing';
import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import Courses from '@dc/screens/UserApp/Courses/Courses';
import cacheConfig from '@dc/graphql/cacheConfig';
import { userInfoMock } from '@dc/tests/mocks/userMocks';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import CLUSTERS from '@dc/graphql/shared/queries/clusters';
import { COLLECTIONS_QUERY } from '@dc/graphql/shared/queries/collections';
import { USER_COURSES_QUERY } from '@dc/graphql/user/queries/userCourses';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

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
const collectionsMock = {
  request: {
    query: COLLECTIONS_QUERY,
  },
  result: {
    data: {
      collections: [
        {
          id: '1',
          name: 'Career',
          __typename: 'Collection',
        },
        {
          id: '2',
          name: 'Financial Literacy',
          __typename: 'Collection',
        },
      ],
    },
  },
};

const coursesMock = {
  request: {
    query: USER_COURSES_QUERY,
    variables: {
      page: 1,
      perPage: 24,
      filter: {
        collectionIdIn: [],
        pathwayIdIn: [],
        typeEq: null,
        searchableColumnsCont: '',
        statusEq: 'PUBLISHED',
      },
    },
  },
  result: {
    data: {
      courses: {
        nodes: [
          {
            metadata: {
              alternativeTitles:
                'Cycle Counter, Fluid Operator, Inventory Specialist, Quality Assurance Inspector (QA Inspector), Scale Operator, Supply Clerk, Temperature Taker',
              averageSalary: '$37,610',
              jobZone: '2',
              onetCode: '43-5111.00',
              outlook: 'Faster than average',
            },
            archivedAt: null,
            id: '1245',
            description:
              '<p>Weigh, measure, and check materials, supplies, and equipment for the purpose of keeping relevant records. Duties are primarily clerical by nature. Includes workers who collect and keep record of samples of products or materials.</p>',
            imageUrl: 'http://test.com/image.jpeg',
            name: 'Supply Clerk',
            pathway: {
              id: '44',
              name: 'Quality Assurance',
            },
            status: 'PUBLISHED',
            thumbnailUrl: 'http://test.com/thumbnail-image.jpeg',
            type: 'HIGH_SCHOOL',
            collection: {
              id: '1',
              name: 'Career',
            },
          },
          {
            metadata: {
              alternativeTitles: 'Lorem Ipsum, Lorem Ipsum, Lorem Ipsum',
              averageSalary: '$37,610',
              jobZone: '2',
              onetCode: '43-5111.00',
              outlook: 'Faster than average',
            },
            archivedAt: null,
            id: '1326',
            description: '<p>Lorem Ipsum</p>',
            imageUrl: 'http://test.com/image.jpeg',
            name: 'Test course',
            pathway: {
              id: '44',
              name: 'Professional Skills',
            },
            status: 'PUBLISHED',
            thumbnailUrl: 'http://test.com/thumbnail-image.jpeg',
            type: 'MIDDLE_SCHOOL',
            collection: {
              id: '2',
              name: 'Financial Literacy',
            },
          },
        ],
        nodesCount: 22,
        pagesCount: 24,
      },
    },
  },
};

const filteredCoursesSpy = jest.fn();

const filteredCoursesMock = {
  request: {
    query: USER_COURSES_QUERY,
    variables: {
      page: 1,
      perPage: 24,
      filter: {
        collectionIdIn: [],
        pathwayIdIn: [],
        typeEq: null,
        searchableColumnsCont: '22-2222.00',
        statusEq: 'PUBLISHED',
      },
    },
  },
  result() {
    filteredCoursesSpy();

    return {
      data: {
        courses: {
          nodes: [
            {
              metadata: {
                alternativeTitles: 'Test, Jest,, Lorem Ipsum',
                averageSalary: '$37,610',
                jobZone: '2',
                onetCode: '22-2222.00',
                outlook: 'Faster than average',
              },
              archivedAt: null,
              id: '1245',
              description:
                '<p>Weigh, measure, and check materials, supplies, and equipment for the purpose of keeping relevant records. Duties are primarily clerical by nature. Includes workers who collect and keep record of samples of products or materials.</p>',
              imageUrl: 'http://test.com/image.jpeg',
              name: 'Onet testing',
              pathway: {
                id: '44',
                name: 'Test Pathway',
              },
              status: 'PUBLISHED',
              thumbnailUrl: 'http://test.com/thumbnail-image.jpeg',
              type: 'HIGH_SCHOOL',
              collection: {
                id: '1',
                name: 'Career',
              },
            },
          ],
          nodesCount: 22,
          pagesCount: 24,
        },
      },
    };
  },
};

const renderCourses = (mocks = []) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider
      cache={cacheConfig}
      mocks={[clustersMock, collectionsMock, coursesMock, userInfoMock, ...mocks]}>
      <UserInfoProvider>
        <NavigationContextProvider>
          <Courses />
        </NavigationContextProvider>
      </UserInfoProvider>
    </MockedProvider>
  );

describe('Courses', () => {
  it('should render correctly', async () => {
    const { container } = renderCourses();

    const firstCourse = await screen.findByRole('link', {
      name: 'Supply Clerk',
    });

    expect(firstCourse).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should render results filtered by ONET', async () => {
    const { container } = renderCourses([filteredCoursesMock]);

    const firstCourse = await screen.findByRole('link', {
      name: 'Supply Clerk',
    });

    expect(firstCourse).toBeInTheDocument();

    const nameFilterInput = screen.getByPlaceholderText('Search for courses...');

    userEvent.type(nameFilterInput, '22-2222.00');

    await waitFor(() => expect(filteredCoursesSpy).toHaveBeenCalledTimes(1));

    const course = await screen.findByRole('link', {
      name: 'Onet testing',
    });

    expect(course).toHaveAttribute('href', '/courses/1245');

    expect(course).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
