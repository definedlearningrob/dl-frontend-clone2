import { MockedProvider } from '@apollo/client/testing';
import { screen, waitFor } from '@testing-library/react';

import ActivityLog from '@dc/components/User/Dashboard/TeacherView/ActivityLog/ActivityLog';
import teacherDashboardActivityLogQuery from '@dc/graphql/user/queries/teacherDashboardActivityLog';
import { renderWithRouter } from '@dc/utils/test';

const activityLogMock = {
  request: {
    query: teacherDashboardActivityLogQuery,
    variables: { first: 15 },
  },
  result: {
    data: {
      teacherDashboard: {
        activityLog: {
          edges: [
            {
              cursor: '1curs',
              node: {
                activity: 'Activity message',
                context: null,
                createdAt: '2020-01-01',
                updatedAt: '2020-01-01',
                student: {
                  firstName: 'Peter',
                  lastName: 'Parker',
                  uuid: '1',
                },
                target: {
                  id: '1',
                  name: 'course#1',
                },
                type: 'ASSIGNMENT_SUBMISSION',
              },
            },
            {
              cursor: '2curs',
              node: {
                activity: 'Second activity message',
                context: null,
                createdAt: '2020-01-01',
                updatedAt: '2020-01-01',
                student: {
                  firstName: 'Bruce',
                  lastName: 'Wayne',
                  uuid: '2',
                },
                target: {
                  id: '1',
                  name: 'course#1',
                },
                type: 'COURSE_ASSIGNMENT',
              },
            },
            {
              cursor: '3cursTeam',
              node: {
                activity: 'Third activity message',
                context: { id: '1', name: 'course#1' },
                createdAt: '2020-01-01',
                updatedAt: '2020-01-01',
                student: {
                  firstName: 'Tony',
                  lastName: 'Stark',
                  uuid: '3',
                },
                target: null,
                team: {
                  id: '1',
                  name: 'Team#1',
                },
                type: 'CHECK_IN_QUESTION_ANSWER',
              },
            },
          ],
          pageInfo: {
            hasNextPage: true,
            endCursor: 'endCurs',
          },
        },
        userId: '1',
      },
    },
  },
};

const emptyActivityLogMock = {
  request: {
    query: teacherDashboardActivityLogQuery,
    variables: { first: 15 },
  },
  result: {
    data: {
      teacherDashboard: {
        activityLog: {
          edges: [],
          pageInfo: {
            hasNextPage: false,
            endCursor: 'xx',
          },
        },
        userId: '1',
      },
    },
  },
};

const renderActivityLog = (mocks) =>
  renderWithRouter(
    <MockedProvider mocks={mocks}>
      <ActivityLog />
    </MockedProvider>
  );

describe('UserDashboardTeacherViewActivityLog', () => {
  it('shows activity items properly', async () => {
    const { getAllByTestId } = renderActivityLog([activityLogMock]);

    await waitFor(() => {
      const items = getAllByTestId(/activity-log-item/);

      expect(items).toHaveLength(3);
      expect(items[0]).toHaveTextContent(/submitted the assignment/);
      expect(items[1]).toHaveTextContent(/was assigned to the course#1 course/);
      expect(items[2]).toHaveTextContent(/answered the check-in question in course#1/);
      expect(items[0]).toHaveTextContent('Peter Parker');
      expect(items[1]).toHaveTextContent('Bruce Wayne');
      expect(items[2]).toHaveTextContent('Tony Stark');
    });
  });

  it('shows placeholder when no logs', async () => {
    renderActivityLog([emptyActivityLogMock]);

    expect(await screen.findByText(/No activity/)).toBeInTheDocument();
  });
});
