import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { screen } from '@testing-library/react';
import { Route } from 'react-router';

import adminDashboardMyReportsQuery from '@dc/graphql/user/queries/adminDashboardMyReports';
import entityPlansQuery from '@dc/graphql/user/queries/entityPlans';
import MyReports from '@dc/components/User/Dashboard/EntityAdminView/MyReports/MyReports';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';
import { userInfoMock } from '@dc/tests/mocks/userMocks';
import { ReportsProvider } from '@dc/hooks/useReports';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
import { ReportType } from '@shared/resources/enums';

const defaultMocks = [
  {
    request: {
      query: adminDashboardMyReportsQuery,
      variables: { uuid: 'someentityuuid', startYear: 2020 },
    },
    result: {
      data: {
        adminDashboard: {
          entity: {
            uuid: '1',
            myReports: {
              assessmentsFinished: 3,
              assignmentsSubmitted: 4,
              coursesEnrolled: 17,
              coursesFinished: 1,
            },
          },
          userId: '1',
        },
      },
    },
  },
  {
    request: {
      query: adminDashboardMyReportsQuery,
      variables: { uuid: 'someentityuuid', startYear: 2020 },
    },
    result: {
      data: {
        adminDashboard: {
          entity: {
            uuid: '1',
            myReports: {
              assessmentsFinished: 3,
              assignmentsSubmitted: 4,
              coursesEnrolled: 17,
              coursesFinished: 1,
            },
          },
          userId: '1',
        },
      },
    },
  },
  {
    request: {
      query: entityPlansQuery,
      variables: { uuid: 'someentityuuid' },
    },
    result: {
      data: {
        entity: {
          uuid: 'someentityuuid',
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
      query: entityPlansQuery,
      variables: { uuid: 'someentityuuid' },
    },
    result: {
      data: {
        entity: {
          uuid: 'someentityuuid',
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

const renderMyReports = ({
  scoped,
  userInfo = {
    entities: {
      nodes: [
        {
          uuid: 'someentityuuid',
          settings: {
            classManagementEnabled: false,
            postSecondaryApplicationsEnabled: false,
            schoolYearStartDate: { day: 7, month: 7 },
          },
          reportTypes: [ReportType.ASSESSMENT, ReportType.CAREER_PATHWAY],
        },
      ],
    },
  },
  mocks = [],
}: { scoped?: boolean; userInfo?: Partial<TUserInfo>; mocks?: MockedResponse[] } = {}) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider addTypename={false} mocks={[...defaultMocks, ...mocks]}>
      <UserInfoProvider value={{ userInfo: { ...userInfoMock.result.data.userInfo, ...userInfo } }}>
        <ReportsProvider>
          <NavigationContextProvider>
            <Route path={scoped ? '/route/:uuid' : '/route'}>
              <MyReports reportModalOpened={false} toggleReportModal={jest.fn()} />
            </Route>
          </NavigationContextProvider>
        </ReportsProvider>
      </UserInfoProvider>
    </MockedProvider>,
    { route: scoped ? '/route/someentityuuid' : '/route' }
  );

describe('UserDashboardEntityAdminViewMyReports', () => {
  it.skip('renders properly', async () => {
    const { container } = renderMyReports();

    const summaryReportTitle = await screen.findByText('Summary');
    expect(summaryReportTitle).toBeInTheDocument();

    const assessmentsCompletedTitle = await screen.findByText('Completed Assessments');
    expect(assessmentsCompletedTitle).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
