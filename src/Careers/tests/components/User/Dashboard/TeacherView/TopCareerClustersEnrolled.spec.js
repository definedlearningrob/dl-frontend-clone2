import { MockedProvider } from '@apollo/client/testing';
import { waitFor } from '@testing-library/react';

import teacherClusterEnrollmentStatsQuery from '@dc/graphql/user/queries/teacherClusterEnrollmentStats';
// eslint-disable-next-line max-len
import TopCareerClustersEnrolled from '@dc/components/User/Dashboard/TeacherView/TopCareerClustersEnrolled/TopCareerClustersEnrolled';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { ReportsProvider } from '@dc/hooks/useReports';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

const clusterEnrollmentStatsMock = {
  request: {
    query: teacherClusterEnrollmentStatsQuery,
    variables: { startYear: 2020 },
  },
  result: {
    data: {
      teacherDashboard: {
        clusterEnrollmentStats: [
          {
            cluster: {
              id: '1',
              name: 'Food',
            },
            studentsCount: 10,
          },
          {
            cluster: {
              id: '2',
              name: 'Training',
            },
            studentsCount: 7,
          },
          {
            cluster: {
              id: '3',
              name: 'Services',
            },
            studentsCount: 3,
          },
        ],
        userId: '1',
      },
    },
  },
};

const emptyClusterEnrollmentStatsMock = {
  request: {
    query: teacherClusterEnrollmentStatsQuery,
    variables: { startYear: 2020 },
  },
  result: {
    data: {
      teacherDashboard: {
        clusterEnrollmentStats: [],
        userId: '1',
      },
    },
  },
};

const renderTopCareerClustersEnrolled = (mocks) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider addTypename={false} mocks={mocks}>
      <NavigationContextProvider>
        <ReportsProvider>
          <TopCareerClustersEnrolled />
        </ReportsProvider>
      </NavigationContextProvider>
    </MockedProvider>
  );

describe('UserDashboardTeacherViewTopCareerClustersEnrolled', () => {
  it('shows list of top enrolled clusters correctly', async () => {
    const { getAllByTestId } = renderTopCareerClustersEnrolled([clusterEnrollmentStatsMock]);

    await waitFor(() => {
      const statItems = getAllByTestId(/top-career-clusters-enrolled-stat$/);

      expect(statItems).toHaveLength(3);
      expect(statItems[0]).toHaveTextContent('Food');
      expect(statItems[1]).toHaveTextContent('Training');
      expect(statItems[2]).toHaveTextContent('Services');
    });
  });

  it("displays each cluster's bar with correct width and value", async () => {
    const { getAllByTestId } = renderTopCareerClustersEnrolled([clusterEnrollmentStatsMock]);

    await waitFor(() => {
      const statBars = getAllByTestId(/top-career-clusters-enrolled-stat-bar/);

      expect(window.getComputedStyle(statBars[0]).width).toBe('100%');
      expect(window.getComputedStyle(statBars[1]).width).toBe('70%');
      expect(window.getComputedStyle(statBars[2]).width).toBe('30%');
      expect(statBars[0]).toHaveTextContent('10');
      expect(statBars[1]).toHaveTextContent('7');
      expect(statBars[2]).toHaveTextContent('3');
    });
  });

  it('shows placeholder when no cluster enrollment stats', async () => {
    const { getByTestId } = renderTopCareerClustersEnrolled([emptyClusterEnrollmentStatsMock]);

    await waitFor(() => {
      expect(getByTestId(/top-career-clusters-enrolled-placeholder/)).toBeInTheDocument();
    });
  });
});
