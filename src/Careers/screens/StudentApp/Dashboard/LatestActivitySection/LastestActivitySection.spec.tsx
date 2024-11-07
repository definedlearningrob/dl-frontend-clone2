import { DashboardRecentResourcesDocument } from '@graphql/dc/students/hooks';
import { MockedProvider } from '@apollo/client/testing';
import { waitFor, screen } from '@testing-library/react';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { LatestActivitySection } from '@dc/screens/StudentApp/Dashboard/LatestActivitySection/LatestActivitySection';
import { studentInfoMock } from '@dc/tests/mocks/studentMocks';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';

const activitiesSpy = jest.fn();

const getActivitiesMock = (count: number) => {
  const dashboardRecentResources = Array.from({ length: count }, (_, index) => ({
    resourceId: (index + 1).toString(),
    resourceType: index % 2 === 0 ? 'COURSE' : 'VIRTUAL_INTERNSHIP',
    name: `Test Resource ${index + 1}`,
    pathways: [
      {
        name: 'Agribusiness Systems',
      },
    ],
    thumbnailUrl: 'http://www.test.com/test.jpg',
    imageUrl: 'http://www.test.com/test.jpg',
    collection: null,
    updatedAt: '2024-03-04T14:55:28Z',
  }));

  return {
    request: {
      query: DashboardRecentResourcesDocument,
      variables: {},
    },
    result: () => {
      activitiesSpy();

      return {
        data: {
          dashboardRecentResources,
        },
      };
    },
  };
};

describe('LatestActivitySection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correct layout for 0 activities', async () => {
    const { container } = renderWithRouterAndReduxProvider(
      <MockedProvider mocks={[studentInfoMock, getActivitiesMock(Number(0))]}>
        <UserInfoProvider
          value={{
            userInfo: {
              ...studentInfoMock.result.data.userInfo,
              firstName: 'Test',
              lastName: 'Man',
            },
          }}>
          <LatestActivitySection />
        </UserInfoProvider>
      </MockedProvider>
    );

    const heading = await screen.findByRole('heading', { name: 'Start Exploring' });
    const description = screen.getByText(
      'Find a career course to enroll in to begin your journey.'
    );
    const coursesLink = screen.getByRole('link', { name: 'Explore Courses' });

    expect(heading).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(coursesLink).toHaveAttribute('href', '/courses');

    expect(container).toMatchSnapshot();
  });

  const testCases = [
    [
      1,
      [
        { name: 'Test Resource 1', href: '/courses/1' },
        { name: 'Add Another Course Go to Courses', href: '/courses' },
      ],
    ],
    [
      2,
      [
        { name: 'Test Resource 1', href: '/courses/1' },
        { name: 'Test Resource 2', href: '/opportunities/2' },
        { name: 'Add Another Course Go to Courses', href: '/courses' },
      ],
    ],
    [
      3,
      [
        { name: 'Test Resource 1', href: '/courses/1' },
        { name: 'Test Resource 2', href: '/opportunities/2' },
        { name: 'Test Resource 3', href: '/courses/3' },
        { name: 'Add Another Course Go to Courses', href: '/courses' },
      ],
    ],
    [
      4,
      [
        { name: 'Test Resource 1', href: '/courses/1' },
        { name: 'Test Resource 2', href: '/opportunities/2' },
        { name: 'Test Resource 3', href: '/courses/3' },
        { name: 'Test Resource 4', href: '/opportunities/4' },
      ],
    ],
    [
      5,
      [
        { name: 'Test Resource 1', href: '/courses/1' },
        { name: 'Test Resource 2', href: '/opportunities/2' },
        { name: 'Test Resource 3', href: '/courses/3' },
        { name: 'Test Resource 4', href: '/opportunities/4' },
      ],
    ],
  ];

  it.each(testCases)(
    'should render correct section layout for %s activities',
    async (activitiesCount, expected) => {
      const { container } = renderWithRouterAndReduxProvider(
        <MockedProvider mocks={[studentInfoMock, getActivitiesMock(Number(activitiesCount))]}>
          <UserInfoProvider
            value={{
              userInfo: {
                ...studentInfoMock.result.data.userInfo,
                firstName: 'Test',
                lastName: 'Man',
              },
            }}>
            <LatestActivitySection />
          </UserInfoProvider>
        </MockedProvider>
      );

      await waitFor(() => expect(activitiesSpy).toHaveBeenCalled());

      Array.isArray(expected) &&
        expected.forEach(({ name, href }) => {
          const heading = screen.getByRole('link', { name });
          expect(heading).toHaveAttribute('href', href);
        });

      expect(container).toMatchSnapshot();
    }
  );
});
