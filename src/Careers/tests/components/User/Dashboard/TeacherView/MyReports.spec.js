import userEvent from '@testing-library/user-event';
import { InMemoryCache } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { waitFor, screen } from '@testing-library/react';
import { Route } from 'react-router';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { ReportLevels } from '@dc/resources/enums';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import generateCourseReportMutation from '@dc/graphql/user/mutations/generateCourseReport';
import generatePlanReportMutation from '@dc/graphql/user/mutations/generatePlanReport';
import teacherDashboardMyReportsQuery from '@dc/graphql/user/queries/teacherDashboardMyReports';
import teacherDashboardPlansQuery from '@dc/graphql/user/queries/teacherDashboardPlans';
import TeacherView from '@dc/components/User/Dashboard/TeacherView/TeacherView';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
import { FILE_TO_DOWNLOAD_KEY } from '@shared/resources/constants';

const getCache = () =>
  new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          teacherDashboard: {
            merge: true,
          },
        },
      },
    },
  });

const defaultMocks = [
  {
    request: {
      query: teacherDashboardMyReportsQuery,
      variables: { userUuid: 'someuseruuid' },
    },
    result: {
      data: {
        teacherDashboard: {
          myReports: {
            assessmentsFinished: 3,
            assignmentsSubmitted: 4,
            coursesEnrolled: 17,
            coursesFinished: 1,
          },
          userId: '1',
        },
      },
    },
  },
  {
    request: {
      query: teacherDashboardPlansQuery,
      variables: { userUuid: 'someuseruuid' },
    },
    result: {
      data: {
        teacherDashboard: {
          userId: '1',
          plans: [
            { id: '1', name: 'First Plan' },
            { id: '2', name: 'Second Plan' },
            { id: '3', name: 'Third Plan' },
          ],
        },
      },
    },
  },
  {
    request: {
      query: teacherDashboardPlansQuery,
      variables: { userUuid: 'someuuidfromparam' },
    },
    result: {
      data: {
        teacherDashboard: {
          userId: '2',
          plans: [
            { id: '1', name: 'First Plan' },
            { id: '2', name: 'Second Plan' },
            { id: '3', name: 'Third Plan' },
          ],
        },
      },
    },
  },
];

const renderMyReports = ({ scoped, userInfo = { uuid: 'someuseruuid' }, mocks = [] } = {}) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider cache={getCache()} mocks={[...defaultMocks, ...mocks]}>
      <UserInfoProvider value={{ userInfo }}>
        <NavigationContextProvider>
          <Route path={scoped ? '/route/:uuid' : '/route'}>
            <TeacherView />
          </Route>
        </NavigationContextProvider>
      </UserInfoProvider>
    </MockedProvider>,
    { route: scoped ? '/route/someuuidfromparam' : '/route' }
  );

describe.skip('UserDashboardTeacherViewMyReports', () => {
  it(`displays 3 stats
  (Completed Assessments , Completed/Enrolled Courses, Submitted Assignmentss)
  with correct values`, async () => {
    const { getAllByTestId } = renderMyReports();

    await waitFor(() => {
      const reportItems = getAllByTestId(/my-reports-item/);

      expect(reportItems).toHaveLength(3);
      expect(reportItems[0]).toHaveTextContent('Completed Assessments');
      expect(reportItems[0]).toHaveTextContent('3');
      expect(reportItems[1]).toHaveTextContent('Completed / Enrolled Courses');
      expect(reportItems[1]).toHaveTextContent('1/17');
      expect(reportItems[2]).toHaveTextContent('Submitted Assignments');
      expect(reportItems[2]).toHaveTextContent('4');
    });
  });

  it('generates courses report by uuid param properly', async () => {
    const spy = jest.fn();
    const generateReportMock = {
      request: {
        query: generateCourseReportMutation,
        variables: {
          input: { level: ReportLevels.USER, levelUuid: 'someuuidfromparam', startYear: 2020 },
        },
      },
      result() {
        spy && spy();

        return {
          data: {
            generateCourseReport: {
              courseReport: {
                id: 'someid',
              },
            },
          },
        };
      },
    };
    renderMyReports({ scoped: true, mocks: [generateReportMock] });

    userEvent.click(screen.getByRole('button', { name: 'Generate Report' }));

    expect(screen.queryByText('Courses Report')).toBeInTheDocument();

    userEvent.click(screen.getByRole('checkbox', { name: 'Courses Report' }));
    userEvent.click(screen.getByRole('button', { name: 'Generate' }));

    await waitFor(() => expect(spy).toHaveBeenCalledTimes(1));
    expect(JSON.parse(localStorage.getItem(FILE_TO_DOWNLOAD_KEY) || '')).toEqual({
      type: 'course',
      levelUuid: 'someuuidfromparam',
      level: ReportLevels.USER,
      id: 'someid',
    });
    expect(screen.queryByText('Courses Report')).not.toBeInTheDocument();
  });

  it('generates courses report by userInfo uuid param properly when no uuid in params', async () => {
    const spy = jest.fn();
    const generateReportMock = {
      request: {
        query: generateCourseReportMutation,
        variables: { input: { level: ReportLevels.USER, levelUuid: 'someuseruuid' } },
      },
      result() {
        spy && spy();

        return {
          data: {
            generateCourseReport: {
              courseReport: {
                id: 'someid',
              },
            },
          },
        };
      },
    };
    renderMyReports({ mocks: [generateReportMock], userInfo: { uuid: 'someuseruuid' } });

    userEvent.click(screen.getByRole('button', { name: 'Generate Report' }));

    expect(screen.queryByText('Courses Report')).toBeInTheDocument();

    userEvent.click(screen.getByRole('checkbox', { name: 'Courses Report' }));
    userEvent.click(screen.getByRole('button', { name: 'Generate' }));

    await waitFor(() => expect(spy).toHaveBeenCalledTimes(1));
    expect(JSON.parse(localStorage.getItem(FILE_TO_DOWNLOAD_KEY) || '')).toEqual({
      type: 'course',
      levelUuid: 'someuseruuid',
      level: ReportLevels.USER,
      id: 'someid',
    });
    expect(screen.queryByText('Courses Report')).not.toBeInTheDocument();
  });

  it('generates plans report by uuid param properly', async () => {
    const spy = jest.fn();
    const generateReportMock = {
      request: {
        query: generatePlanReportMutation,
        variables: {
          input: {
            level: ReportLevels.USER,
            levelUuid: 'someuuidfromparam',
            planId: '2',
          },
        },
      },
      result() {
        spy && spy();

        return {
          data: {
            generatePlanReport: {
              planReport: {
                id: 'someid',
              },
            },
          },
        };
      },
    };
    renderMyReports({ scoped: true, mocks: [generateReportMock] });

    userEvent.click(screen.getByRole('button', { name: 'Generate Report' }));

    await waitFor(() => expect(screen.queryByText('First Plan')).toBeInTheDocument());

    userEvent.click(screen.getByRole('checkbox', { name: 'Second Plan' }));
    userEvent.click(screen.getByRole('button', { name: 'Generate' }));

    await waitFor(() => expect(spy).toHaveBeenCalledTimes(1));
    expect(JSON.parse(localStorage.getItem(FILE_TO_DOWNLOAD_KEY) || '')).toEqual({
      type: 'plan',
      levelUuid: 'someuuidfromparam',
      level: ReportLevels.USER,
      id: 'someid',
      planId: '2',
    });
    expect(screen.queryByText('First Plan')).not.toBeInTheDocument();
  });

  it('generates plans report by userInfo uuid param properly when no uuid in params', async () => {
    const spy = jest.fn();
    const generateReportMock = {
      request: {
        query: generatePlanReportMutation,
        variables: {
          input: {
            level: ReportLevels.USER,
            levelUuid: 'someuseruuid',
            planId: '2',
          },
        },
      },
      result() {
        spy && spy();

        return {
          data: {
            generatePlanReport: {
              planReport: {
                id: 'someid',
              },
            },
          },
        };
      },
    };
    renderMyReports({ mocks: [generateReportMock], userInfo: { uuid: 'someuseruuid' } });

    userEvent.click(screen.getByRole('button', { name: 'Generate Report' }));

    await waitFor(() => expect(screen.queryByText('First Plan')).toBeInTheDocument());

    userEvent.click(screen.getByRole('checkbox', { name: 'Second Plan' }));
    userEvent.click(screen.getByRole('button', { name: 'Generate' }));

    await waitFor(() => expect(spy).toHaveBeenCalledTimes(1));
    expect(JSON.parse(localStorage.getItem(FILE_TO_DOWNLOAD_KEY) || '')).toEqual({
      type: 'plan',
      levelUuid: 'someuseruuid',
      level: ReportLevels.USER,
      id: 'someid',
      planId: '2',
    });
    expect(screen.queryByText('First Plan')).not.toBeInTheDocument();
  });
});
