import userEvent from '@testing-library/user-event';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { waitFor, screen, within } from '@testing-library/react';

import adminUsers from '@dc/graphql/user/queries/adminUsers';
import generateCourseReportMutation from '@dc/graphql/user/mutations/generateCourseReport';
import generatePlanReportMutation from '@dc/graphql/user/mutations/generatePlanReport';
import UserDashboardEntityAdminViewTables from '@dc/components/User/Dashboard/EntityAdminView/Tables/Tables';
import userPlansQuery from '@dc/graphql/user/queries/userPlans';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { ReportLevels } from '@dc/resources/enums';
import { ROLES } from '@dc/resources/constants';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { userInfoMock } from '@dc/tests/mocks/userMocks';
import { ReportsProvider } from '@dc/hooks/useReports';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
import { FileDownloadProvider } from '@shared/hooks/useFileDownload';
import { FILE_TO_DOWNLOAD_KEY } from '@shared/resources/constants';

Element.prototype.getBoundingClientRect = () =>
  ({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  } as any);

const defaultMocks = [
  {
    request: {
      query: adminUsers,
      variables: {
        uuid: 'entityuuid',
        perPage: 50,
        filter: { fullNameCont: undefined },
        page: 1,
      },
    },
    result: {
      data: {
        adminDashboard: {
          entity: {
            users: {
              nodes: [
                {
                  entity: {
                    name: 'entity name',
                    parent: { name: 'parent name', uuid: 'parentuuid' },
                    uuid: 'uuid',
                  },
                  firstName: 'Bruce',
                  lastName: 'Wayne',
                  role: ROLES.ENTITY_ADMIN,
                  schoolClassesCount: 1,
                  uuid: '1',
                },
              ],
              pagesCount: 1,
            },
            uuid: 'entityuuid',
          },
          userId: '1',
        },
      },
    },
  },

  {
    request: {
      query: userPlansQuery,
      variables: { uuid: '1' },
    },
    result: {
      data: {
        user: {
          uuid: '1',
          entities: {
            nodes: [
              {
                uuid: '1',
                plans: [
                  { id: '1', name: 'First Plan' },
                  { id: '2', name: 'Second Plan' },
                  { id: '3', name: 'Third Plan' },
                ],
              },
              {
                uuid: '2',
                plans: [],
              },
            ],
          },
        },
      },
    },
  },
  userInfoMock,
];

const renderTables = ({
  mocks = [],
  hasChildren = false,
}: {
  mocks?: MockedResponse[];
  hasChildren?: boolean;
}) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider mocks={[...defaultMocks, ...mocks]}>
      <UserInfoProvider
        value={{
          userInfo: {
            ...userInfoMock.result.data.userInfo,
            uuid: '1',
          },
        }}>
        <ReportsProvider>
          <NavigationContextProvider>
            <FileDownloadProvider>
              <UserDashboardEntityAdminViewTables hasChildren={hasChildren} />
            </FileDownloadProvider>
          </NavigationContextProvider>
        </ReportsProvider>
      </UserInfoProvider>
    </MockedProvider>
  );

describe('UserDashboardEntityAdminViewTables', () => {
  it('shows proper tabs when hasChildren is true', () => {
    renderTables({ hasChildren: true });

    const usersTab = screen.getByRole('tab', { name: 'Users' });
    const entitiesTab = screen.getByRole('tab', { name: 'Entities' });

    expect(usersTab).toBeInTheDocument();
    expect(entitiesTab).toBeInTheDocument();
  });

  it('shows proper tabs when hasChildren is false', () => {
    renderTables({ hasChildren: false });

    const usersTab = screen.getByRole('tab', { name: 'Users' });
    const entitiesTab = screen.queryByRole('tab', { name: 'Entities' });

    expect(usersTab).toBeInTheDocument();
    expect(entitiesTab).not.toBeInTheDocument();
  });

  it('generates courses report by uuid param properly', async () => {
    const spy = jest.fn();
    const generateReportMock = {
      request: {
        query: generateCourseReportMutation,
        variables: { input: { level: ReportLevels.USER, levelUuid: '1', startYear: 2020 } },
      },
      result() {
        spy();

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
    renderTables({ mocks: [generateReportMock], hasChildren: false });

    const table = await screen.findByRole('table');
    const generateReportOptions = within(table).getAllByTestId('icon-button');

    userEvent.click(generateReportOptions[0]);

    const modalHeader = await screen.findByText('Courses Report');

    expect(modalHeader).toBeInTheDocument();

    userEvent.click(screen.getByRole('radio', { name: 'Courses Report' }));
    userEvent.click(screen.getByRole('button', { name: 'Generate' }));

    await waitFor(() => expect(spy).toHaveBeenCalledTimes(1));
    expect(JSON.parse(localStorage.getItem(FILE_TO_DOWNLOAD_KEY) || '')).toMatchObject({
      id: 'someid',
      variables: {
        level: ReportLevels.USER,
        levelUuid: '1',
      },
    });
    expect(screen.queryByText('Courses Report')).not.toBeInTheDocument();
  });

  it('generates courses report by uuid param properly', async () => {
    const spy = jest.fn();

    const generateReportMock = {
      request: {
        query: generateCourseReportMutation,
        variables: { input: { level: ReportLevels.USER, levelUuid: '1', startYear: 2020 } },
      },
      result() {
        spy();

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

    renderTables({ mocks: [generateReportMock], hasChildren: false });

    const table = await screen.findByRole('table');
    const generateReportOptions = within(table).getAllByTestId('icon-button');

    userEvent.click(generateReportOptions[0]);

    const modalHeader = await screen.findByText('Courses Report');

    expect(modalHeader).toBeInTheDocument();

    userEvent.click(screen.getByRole('radio', { name: 'Courses Report' }));
    userEvent.click(screen.getByRole('button', { name: 'Generate' }));

    await waitFor(() => expect(spy).toHaveBeenCalledTimes(1));

    expect(JSON.parse(localStorage.getItem(FILE_TO_DOWNLOAD_KEY) || '')).toMatchObject({
      variables: {
        levelUuid: '1',
        level: ReportLevels.USER,
      },
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
          input: { level: ReportLevels.USER, levelUuid: '1', planId: '2', startYear: 2020 },
        },
      },
      result() {
        spy();

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
    renderTables({ mocks: [generateReportMock, userInfoMock], hasChildren: false });

    userEvent.click(screen.getByRole('tab', { name: 'Users' }));

    const table = await screen.findByRole('table');

    const generateReportOptions = within(table).getAllByTestId('icon-button');

    userEvent.click(generateReportOptions[0]);

    const modalHeader = await screen.findByText('First Plan');

    expect(modalHeader).toBeInTheDocument();

    userEvent.click(screen.getByRole('radio', { name: 'Second Plan' }));
    userEvent.click(screen.getByRole('button', { name: 'Generate' }));

    await waitFor(() => expect(spy).toHaveBeenCalledTimes(1));
    expect(JSON.parse(localStorage.getItem(FILE_TO_DOWNLOAD_KEY) || '')).toMatchObject({
      id: 'someid',
      variables: {
        planId: '2',
        levelUuid: '1',
        level: ReportLevels.USER,
      },
    });
    expect(screen.queryByText('First Plan')).not.toBeInTheDocument();
  });
});
