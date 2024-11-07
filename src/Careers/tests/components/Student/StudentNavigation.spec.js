import { createMemoryHistory } from 'history';
import { fireEvent, screen, waitFor } from '@testing-library/dom';
import { I18nextProvider } from 'react-i18next';
import { MockedProvider } from '@apollo/client/testing';

import i18n from '@dc/i18n';
import { StudentNavigation } from '@dc/components/Student/Navigation/Navigation';
import { ExpandSidebarProvider } from '@dc/hooks/useExpandSidebar';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { studentInfoMock } from '@dc/tests/mocks/studentMocks';

import { Sidebar } from '@shared/components/Sidebar/Sidebar';
import { MessagingProvider } from '@shared/hooks/useMessaging';
import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
const history = createMemoryHistory();

history.replace = jest.fn();

const getSideBarItem = (number) =>
  screen.getAllByTestId(/navigation-item/)[number].querySelector('span');

const renderSideBar = () =>
  renderWithRouterAndReduxProvider(
    <MockedProvider mocks={[studentInfoMock]}>
      <I18nextProvider i18n={i18n}>
        <UserInfoProvider value={{ userInfo: studentInfoMock.result.data.userInfo }}>
          <ExpandSidebarProvider>
            <NavigationContextProvider>
              <MessagingProvider refreshUser={jest.fn()} userInfo={{}}>
                <Sidebar LogoComponent={() => <div>Logo</div>}>
                  <StudentNavigation />
                </Sidebar>
              </MessagingProvider>
            </NavigationContextProvider>
          </ExpandSidebarProvider>
        </UserInfoProvider>
      </I18nextProvider>
    </MockedProvider>,
    { history, initialState: { session: { user: { type: 'student' } } } }
  );

describe('StudentNavigation', () => {
  it('renders correctly', async () => {
    const { container } = renderSideBar();

    expect(container).toMatchSnapshot();
  });

  it('shows all options with visible text', () => {
    renderSideBar();

    const firstItem = getSideBarItem(0);
    const secondItem = getSideBarItem(1);

    expect(firstItem).toHaveTextContent('Dashboard');
    expect(firstItem).toHaveClass('text');

    expect(secondItem).toHaveTextContent('Courses');
    expect(secondItem).toHaveClass('text');
  });

  it('navigates properly', async () => {
    renderSideBar();

    const dashboardRoute = screen.getByTestId(/navigation-item-dashboard/);
    const coursesRoute = screen.getByTestId(/navigation-item-courses/);

    fireEvent.click(dashboardRoute);
    await waitFor(() => expect(history.location.pathname).toBe('/'));

    fireEvent.click(coursesRoute);
    await waitFor(() => expect(history.location.pathname).toBe('/courses'));
  });

  it('switches visibility on hide/show button click', async () => {
    renderSideBar();
    const firstItem = getSideBarItem(0);
    const secondItem = getSideBarItem(1);

    const changeSizeButton = screen.getByTestId(/sidebar-expand-button/);

    fireEvent.click(changeSizeButton);

    expect(firstItem).toHaveClass('text');
    expect(firstItem).not.toHaveClass('opacity-0');

    expect(secondItem).toHaveClass('text');
    expect(secondItem).not.toHaveClass('opacity-0');

    await waitFor(() => fireEvent.click(changeSizeButton));

    await waitFor(() => {
      expect(firstItem).toHaveClass('font-medium truncate text opacity-0');
      expect(secondItem).toHaveClass('font-medium truncate text opacity-0');
    });
  });
});
