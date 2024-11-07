import { MockedProvider } from '@apollo/client/testing';
import { waitFor } from '@testing-library/react';

import teacherPathwayEnrollmentStatsQuery from '@dc/graphql/user/queries/teacherPathwayEnrollmentStats';
import TopPathwaysEnrolled from '@dc/components/User/Dashboard/TeacherView/TopPathwaysEnrolled/TopPathwaysEnrolled';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { ReportsProvider } from '@dc/hooks/useReports';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

const pathwayEnrollmentStatsMock = {
  request: {
    query: teacherPathwayEnrollmentStatsQuery,
    variables: {
      startYear: 2020,
    },
  },
  result: {
    data: {
      teacherDashboard: {
        userId: '1',
        pathwayEnrollmentStats: [
          {
            pathway: {
              id: '1',
              name: 'Design',
            },
            studentsCount: 10,
          },
          {
            pathway: {
              id: '2',
              name: 'Production',
            },
            studentsCount: 7,
          },
          {
            pathway: {
              id: '3',
              name: 'Engineering',
            },
            studentsCount: 3,
          },
        ],
      },
    },
  },
};

const emptyPathwayEnrollmentStatsMock = {
  request: {
    query: teacherPathwayEnrollmentStatsQuery,
    variables: { startYear: 2020 },
  },
  result: {
    data: {
      teacherDashboard: {
        pathwayEnrollmentStats: [],
        userId: '1',
      },
    },
  },
};

const renderTopPathwaysEnrolled = (mocks) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider addTypename={false} mocks={mocks}>
      <NavigationContextProvider>
        <ReportsProvider>
          <TopPathwaysEnrolled />
        </ReportsProvider>
      </NavigationContextProvider>
    </MockedProvider>
  );

describe('UserDashboardTeacherViewTopPathwaysEnrolled', () => {
  it('shows list of top enrolled pathways correctly', async () => {
    const { getAllByTestId } = renderTopPathwaysEnrolled([pathwayEnrollmentStatsMock]);

    await waitFor(() => {
      const statItems = getAllByTestId(/top-pathways-enrolled-stat$/);

      expect(statItems).toHaveLength(3);
      expect(statItems[0]).toHaveTextContent('Design');
      expect(statItems[1]).toHaveTextContent('Production');
      expect(statItems[2]).toHaveTextContent('Engineering');
    });
  });

  it("displays each pathway's bar with correct width and value", async () => {
    const { getAllByTestId } = renderTopPathwaysEnrolled([pathwayEnrollmentStatsMock]);

    await waitFor(() => {
      const statBars = getAllByTestId(/top-pathways-enrolled-stat-bar/);

      expect(window.getComputedStyle(statBars[0]).width).toBe('100%');
      expect(window.getComputedStyle(statBars[1]).width).toBe('70%');
      expect(window.getComputedStyle(statBars[2]).width).toBe('30%');
      expect(statBars[0]).toHaveTextContent('10');
      expect(statBars[1]).toHaveTextContent('7');
      expect(statBars[2]).toHaveTextContent('3');
    });
  });

  it('shows placeholder when no pathway enrollment stats', async () => {
    const { getByTestId } = renderTopPathwaysEnrolled([emptyPathwayEnrollmentStatsMock]);

    await waitFor(() => {
      expect(getByTestId(/top-pathways-enrolled-placeholder/)).toBeInTheDocument();
    });
  });
});
