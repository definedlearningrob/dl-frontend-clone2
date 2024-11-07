import { MockedProvider } from '@apollo/client/testing';
import { act, screen } from '@testing-library/react';

import AppHeaderDropdown from '@dc/components/AppHeader/Dropdown/Dropdown';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { Roles } from '@dc/resources/enums';
import { userInfoMock } from '@dc/tests/mocks/userMocks';

const renderAppHeaderDropdown = () =>
  renderWithRouterAndReduxProvider(
    <MockedProvider>
      <UserInfoProvider value={{ userInfo: { role: Roles.TEACHER } }}>
        <AppHeaderDropdown />
      </UserInfoProvider>
    </MockedProvider>
  );

describe('AppHeaderDropdown', () => {
  it('render <AppHeaderDropdown /> correctly', async () => {
    const { container } = renderAppHeaderDropdown([userInfoMock]);
    const ul = container.firstChild;

    expect(ul).toBeInTheDocument();

    await act(() => Promise.resolve());
  });

  it('render only student list', async () => {
    const { getAllByTestId } = renderAppHeaderDropdown([userInfoMock]);
    const listItems = getAllByTestId('app-header-dropdown-element');
    const itemButton = getAllByTestId('dropdown-button');

    expect(listItems).toHaveLength(1);
    expect(itemButton).toHaveLength(1);
    expect(screen.getByTestId('app-header-dropdown-element')).toHaveTextContent(/logout/i);
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
    expect(screen.getByTestId('app-header-dropdown-element')).not.toHaveTextContent(/dashboard/i);

    await act(() => Promise.resolve());
  });
});
