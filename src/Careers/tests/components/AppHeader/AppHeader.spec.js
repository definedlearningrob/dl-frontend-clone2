import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, waitFor } from '@testing-library/react';

import AppHeader from '@dc/components/AppHeader/AppHeader';
import { ROLES } from '@dc/resources/constants';
import { ExpandSidebarProvider } from '@dc/hooks/useExpandSidebar';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { stopImpersonate } from '@dc/services/session';
import { studentInfoMock } from '@dc/tests/mocks/studentMocks';
import { userInfoMock } from '@dc/tests/mocks/userMocks';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
import { PresentationStateProvider } from '@shared/hooks/usePresentationState';

const defaultMock = [userInfoMock, studentInfoMock];

const defaultState = {
  session: {
    user: {
      type: 'user',
      role: ROLES.SYSTEM_ADMIN,
    },
  },
};

const defaultSidebarProviderValues = {
  navigation: true,
};

const defaultUserProviderValues = (userInfo) => ({
  userInfo: {
    email: 'bruce@wayne.com',
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    role: ROLES.SYSTEM_ADMIN,
    status: 'status',
    username: 'brucewayne',
    uuid: 'someuuid',
    entities: {
      nodes: [],
    },
    isImpersonated: userInfo.isImpersonated,
    hasUnreadConversation: false,
    __typename: 'userInfo',
  },
  loading: false,
});

const renderAppHeader = (
  initialState = defaultState,
  sidebarProviderValues = defaultSidebarProviderValues,
  userInfo = {
    firstName: 'Bruce',
    lastName: 'Wayne',
  }
) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider mocks={[...defaultMock]}>
      <NavigationContextProvider>
        <PresentationStateProvider>
          <UserInfoProvider value={defaultUserProviderValues(userInfo)}>
            <ExpandSidebarProvider value={sidebarProviderValues}>
              <AppHeader />
            </ExpandSidebarProvider>
          </UserInfoProvider>
        </PresentationStateProvider>
      </NavigationContextProvider>
    </MockedProvider>,
    { initialState }
  );

jest.mock('@dc/services/session', () => ({
  stopImpersonate: jest.fn().mockImplementation(() => Promise.resolve({ token: 'sometokenhere' })),
}));

describe('AppHeader', () => {
  it('render <AppHeader /> correctly', async () => {
    const { getByTestId } = renderAppHeader();

    await waitFor(() => {
      expect(getByTestId(/header-desktop/i)).toBeInTheDocument();
    });
  });

  it('back button does not render', async () => {
    const { getByTestId } = renderAppHeader();

    await waitFor(() => {
      expect(getByTestId(/header-desktop/i)).not.toHaveTextContent(/back/i);
    });
  });

  it('render default userInfo values', async () => {
    const { getByTestId, getByText } = renderAppHeader();
    const userInfoValues = getByText('Bruce Wayne');

    await waitFor(() => {
      expect(getByTestId(/user-first-last-name/)).toHaveTextContent(/Bruce Wayne/i);
      expect(getByTestId(/user-first-last-name/)).toBe(userInfoValues);
    });
  });

  it('render passed userInfo values', async () => {
    const initialState = {
      session: {
        user: {
          type: 'user',
          role: ROLES.SYSTEM_ADMIN,
        },
      },
    };

    const sidebarProviderValues = {
      navigation: true,
    };

    const userInfo = {
      firstName: 'Tom',
      lastName: 'Joyce',
    };

    const { getByTestId, getByText } = renderAppHeader(
      initialState,
      sidebarProviderValues,
      userInfo
    );
    const userInfoValues = getByText('Tom Joyce');

    await waitFor(() => {
      expect(getByTestId(/user-first-last-name/)).toHaveTextContent(/Tom Joyce/i);
      expect(getByTestId(/user-first-last-name/)).toBe(userInfoValues);
    });
  });

  it('render user Avatar', async () => {
    const { getByTestId } = renderAppHeader();

    await waitFor(() => {
      expect(getByTestId(/avatar-image/i)).toBeInTheDocument();
    });
  });

  it('dropdown component <AppHeaderDropdown /> does not render', async () => {
    const { getByTestId, getAllByTestId } = renderAppHeader();
    const icons = getAllByTestId('icon');

    await waitFor(() => {
      expect(icons).toHaveLength(2);
      expect(getByTestId(/header-desktop/i)).not.toHaveTextContent(/logout/i);
      expect(getByTestId(/header-desktop/i)).not.toHaveTextContent(/dashboard/i);
      expect(getByTestId(/header-desktop/i)).not.toHaveTextContent(/admin panel/i);
    });
  });

  it('render dropdown component <AppHeaderDropdown /> when logged in', async () => {
    const { getByTestId, getAllByTestId } = renderAppHeader();

    fireEvent.click(getByTestId(/dropdown-section/i));

    const icons = getAllByTestId('icon');

    await waitFor(() => {
      expect(icons).toHaveLength(4);
      expect(getByTestId(/header-desktop/i)).toHaveTextContent(/logout/i);
      expect(getByTestId(/header-desktop/i)).toHaveTextContent(/admin panel/i);
    });
  });

  it('does not render impersonating info when not impersonated', async () => {
    const { queryByTestId } = renderAppHeader();

    await waitFor(() => {
      expect(queryByTestId('impersonated-label')).not.toBeInTheDocument();
      expect(queryByTestId('stop-impersonating-button')).not.toBeInTheDocument();
    });
  });

  it('renders impersonating info when impersonated', async () => {
    const { getByTestId } = renderAppHeader(undefined, undefined, { isImpersonated: true });

    await waitFor(() => {
      expect(getByTestId('impersonated-label')).toBeInTheDocument();
      expect(getByTestId('stop-impersonating-button')).toBeInTheDocument();
    });
  });

  it('calls stop impersonating of session service', async () => {
    const { getByTestId } = renderAppHeader(undefined, undefined, { isImpersonated: true });

    await waitFor(() => {
      fireEvent.click(getByTestId('stop-impersonating-button'));
    });

    await waitFor(() => {
      expect(stopImpersonate).toHaveBeenCalledTimes(1);
    });
  });
});
