import { MockedProvider, MockedResponse } from '@apollo/client/testing';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import AppHeader from '@dc/components/AppHeader/AppHeader';
import { Roles } from '@dc/resources/enums';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import Notifications from '@dc/graphql/student/queries/notifications';
import { ExpandSidebarProvider } from '@dc/hooks/useExpandSidebar';
import { userInfoMock } from '@dc/tests/mocks/userMocks';
import { studentInfoMock } from '@dc/tests/mocks/studentMocks';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
import { PresentationStateProvider } from '@shared/hooks/usePresentationState';
import { TNotificationsData } from '@shared/components/Notifications/types';

describe('AppHeader', () => {
  it('should render correctly for teacher', () => {
    const { container } = renderWithRouterAndReduxProvider(
      <MockedProvider mocks={[userInfoMock]}>
        <ExpandSidebarProvider>
          <PresentationStateProvider>
            <NavigationContextProvider>
              <UserInfoProvider
                value={{
                  userInfo: {
                    ...userInfoMock.result.data.userInfo,
                    role: Roles.TEACHER,
                    firstName: 'Test',
                    lastName: 'Man',
                  },
                }}>
                <AppHeader />
              </UserInfoProvider>
            </NavigationContextProvider>
          </PresentationStateProvider>
        </ExpandSidebarProvider>
      </MockedProvider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly for student', () => {
    const initialState = {
      session: {
        user: {
          type: 'student',
        },
        loginError: {},
      },
    };

    const notificationMock: MockedResponse<TNotificationsData> = {
      request: {
        query: Notifications,
        variables: { page: 1, perPage: 10, scope: 'ALL', type: 'GENERAL' },
      },
      result: {
        data: {
          notifications: { nodesCount: 0, nodes: [], pagesCount: 1 },
        },
      },
    };

    const announcementsMock: MockedResponse<TNotificationsData> = {
      request: {
        query: Notifications,
        variables: { page: 1, perPage: 10, scope: 'ALL', type: 'ANNOUNCEMENT' },
      },
      result: {
        data: {
          notifications: { nodesCount: 0, nodes: [], pagesCount: 1 },
        },
      },
    };

    const { container } = renderWithRouterAndReduxProvider(
      <MockedProvider mocks={[notificationMock, announcementsMock, studentInfoMock]}>
        <ExpandSidebarProvider>
          <PresentationStateProvider>
            <NavigationContextProvider>
              <UserInfoProvider
                value={{
                  userInfo: {
                    ...studentInfoMock.result.data.userInfo,
                    firstName: 'Test',
                    lastName: 'Man',
                  },
                }}>
                <AppHeader />
              </UserInfoProvider>
            </NavigationContextProvider>
          </PresentationStateProvider>
        </ExpandSidebarProvider>
      </MockedProvider>,
      { initialState }
    );

    expect(container).toMatchSnapshot();
  });
});
