import { MockedProvider } from '@apollo/client/testing';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DashboardRecentResourcesDocument } from '@graphql/dc/students/hooks';

import { renderWithRouter } from '@dc/utils/test';
import { CoursesSummary } from '@dc/screens/StudentApp/Dashboard/CoursesSummary';

const activitiesSpy = jest.fn();

const getActivitiesMock = (count: number) => {
  const dashboardRecentResources = Array.from({ length: count }, (_, index) => ({
    resourceId: (index + 1).toString(),
    resourceType: 'VIRTUAL_INTERNSHIP',
    name: 'Test',
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

describe('CoursesSummary', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const testCases = [
    [0, 'Here you can access your most recent activities, you can add more through courses.'],
    [1, 'Here you can access your 1 most recent activity.'],
    [2, 'Here you can access your 2 most recent activities.'],
    [3, 'Here you can access your 3 most recent activities.'],
    [4, 'Here you can access your 4 most recent activities.'],
    [
      5,
      'Here you can access your 4 most recent activities from 5 total. You can add more through courses.',
    ],
    [
      15,
      'Here you can access your 4 most recent activities from 15 total. You can add more through courses.',
    ],
  ];

  it.each(testCases)(
    'should render correct summary for %s activities',
    async (activitiesCount, expectedSummary) => {
      const { container } = renderWithRouter(
        <MockedProvider mocks={[getActivitiesMock(Number(activitiesCount))]}>
          <CoursesSummary />
        </MockedProvider>
      );

      await waitFor(() => expect(activitiesSpy).toHaveBeenCalled());

      expect(container.textContent).toEqual(expectedSummary);

      expect(container).toMatchSnapshot();
    }
  );

  it('should render modal', async () => {
    renderWithRouter(
      <MockedProvider mocks={[getActivitiesMock(5)]}>
        <CoursesSummary />
      </MockedProvider>
    );

    await waitFor(() => expect(activitiesSpy).toHaveBeenCalled());

    const modalToggle = screen.getByText(/5 total/i);

    userEvent.click(modalToggle);

    const modal = await screen.findByRole('dialog');
    const modalHeader = await screen.getByText(/All Activities/i);

    expect(modal).toBeInTheDocument();
    expect(modalHeader.textContent).toEqual('All Activities (5)');

    expect(modal).toMatchSnapshot();
  });
});
