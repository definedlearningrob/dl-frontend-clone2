import { MockedProvider, MockedResponse } from '@apollo/client/testing';

import { renderWithRouterAndReduxProvider } from '@pbl/utils/test';
import { Roles } from '@pbl/resources/enums';
import { UserInfoProvider } from '@pbl/hooks/useUserInfo';
import Notifications from '@pbl/graphql/student/queries/notifications';
import AppHeader from '@pbl/components/AppHeader/AppHeader';
import { DLStudentInfoMock } from '@pbl/tests/mocks/studentInfoMock';

import { PresentationStateProvider } from '@shared/hooks/usePresentationState';
import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
import { TNotificationsData } from '@shared/components/Notifications/types';

describe('AppHeader', () => {
  // skipped due to prolems with connectAutoComplete HOC in search box
  it.skip('should render correctly for teacher', () => {
    const { container } = renderWithRouterAndReduxProvider(
      <MockedProvider>
        <PresentationStateProvider>
          <NavigationContextProvider>
            <UserInfoProvider
              value={{ userInfo: { role: Roles.TEACHER, firstName: 'Test', lastName: 'Man' } }}>
              <AppHeader />
            </UserInfoProvider>
          </NavigationContextProvider>
        </PresentationStateProvider>
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
      <MockedProvider mocks={[notificationMock, announcementsMock, DLStudentInfoMock]}>
        <PresentationStateProvider>
          <NavigationContextProvider>
            <UserInfoProvider value={{ userInfo: { firstName: 'Test', lastName: 'Man' } }}>
              <AppHeader />
            </UserInfoProvider>
          </NavigationContextProvider>
        </PresentationStateProvider>
      </MockedProvider>,
      { initialState }
    );

    expect(container).toMatchSnapshot();
  });
});
