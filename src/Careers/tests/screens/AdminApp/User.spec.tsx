import userEvent from '@testing-library/user-event';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { Route } from 'react-router';
import { waitFor, screen } from '@testing-library/react';

import User from '@dc/screens/AdminApp/User/User';
import updateUserMutation from '@dc/graphql/user/mutations/updateUser';
import userQuery from '@dc/graphql/user/queries/user';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { Roles } from '@dc/resources/enums';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { userInfoMock } from '@dc/tests/mocks/userMocks';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

const defaultMocks = [
  {
    request: {
      query: userQuery,
      variables: {
        uuid: '1',
      },
    },
    result: {
      data: {
        user: {
          firstName: 'Bruce',
          lastName: 'Wayne',
          uuid: '1',
          email: 'bruce@wayne.com',
          role: Roles.TEACHER,
          permissions: [],
        },
      },
    },
  },
  userInfoMock,
];

const renderAdminAppUser = ({
  mocks = [],
  userInfo,
}: { mocks?: MockedResponse[]; userInfo?: TUserInfo } = {}) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider mocks={[...defaultMocks, ...mocks]}>
      <UserInfoProvider
        value={{ userInfo: { ...userInfoMock.result.data.userInfo, uuid: '2', ...userInfo } }}>
        <NavigationContextProvider>
          <Route path='/admin/users/:userUuid'>
            <User />
          </Route>
        </NavigationContextProvider>
      </UserInfoProvider>
    </MockedProvider>,
    { route: '/admin/users/1' }
  );

describe('AdminAppUser', () => {
  it('renders properly', async () => {
    renderAdminAppUser();

    const userName = await screen.findByRole('heading');
    const email = screen.getByText('bruce@wayne.com');
    const role = document.querySelector('.select__single-value');

    expect(userName).toHaveTextContent('Bruce Wayne');
    expect(email).toBeInTheDocument();

    expect(role).toHaveTextContent('Teacher');
  });

  it('show proper role options and allow to choose one', async () => {
    renderAdminAppUser();

    await waitFor(() => expect(document.querySelector('.select__control')).toBeInTheDocument());

    const selectTrigger = document.querySelector('.select__control')!;

    userEvent.click(selectTrigger);

    const options = document.querySelectorAll('.select__option');

    expect(options).toHaveLength(4);
    expect(options[0]).toHaveTextContent('Entity Admin');
    expect(options[1]).toHaveTextContent('Sales Admin');
    expect(options[2]).toHaveTextContent('System Admin');
    expect(options[3]).toHaveTextContent('Teacher');

    userEvent.click(options[3]);

    expect(document.querySelector('.select__single-value')).toHaveTextContent('Teacher');
  });

  it('show proper permission options and allow to choose one', async () => {
    renderAdminAppUser();

    await waitFor(() =>
      expect(document.querySelectorAll('.select__control')[1]).toBeInTheDocument()
    );

    const selectTrigger = document.querySelectorAll('.select__control')[1]!;

    userEvent.click(selectTrigger);

    const options = document.querySelectorAll('.select__option');

    expect(options).toHaveLength(4);
    expect(options[0]).toHaveTextContent('WBL Admin');
    expect(options[1]).toHaveTextContent('Counselor');
    expect(options[2]).toHaveTextContent('Impersonate');
    expect(options[3]).toHaveTextContent('Reports');

    userEvent.click(options[0]);

    expect(document.querySelectorAll('.select__multi-value')[0]).toHaveTextContent('WBL Admin');
  });

  it('disable role & permission changer for self', async () => {
    renderAdminAppUser({ userInfo: { ...userInfoMock.result.data.userInfo, uuid: '1' } });

    await waitFor(() => expect(document.querySelector('.select__control')).toBeInTheDocument());

    const selectTrigger = document.querySelectorAll('.select__control--is-disabled')!;

    expect(selectTrigger).toHaveLength(2);
  });

  it('updates role properly', async () => {
    const updateUserSpy = jest.fn();
    const updateUserMock = {
      request: {
        query: updateUserMutation,
        variables: {
          input: {
            uuid: '1',
            role: Roles.TEACHER,
            permissions: {
              wblAdmin: false,
              counselor: false,
              canImpersonate: false,
              canBrowseReports: false,
            },
          },
        },
      },
      result() {
        updateUserSpy();

        return {
          data: {
            updateUser: {
              user: {
                uuid: '1',
                role: Roles.TEACHER,
                permissions: {
                  wblAdmin: false,
                  counselor: false,
                  canImpersonate: false,
                  canBrowseReports: false,
                },
              },
            },
          },
        };
      },
    };

    renderAdminAppUser({ mocks: [updateUserMock] });

    await waitFor(() => expect(document.querySelector('.select__control')).toBeInTheDocument());

    const selectTrigger = document.querySelector('.select__control')!;
    const saveButton = screen.getByRole('button', { name: 'Save' });

    userEvent.click(selectTrigger);

    const options = document.querySelectorAll('.select__option');

    userEvent.click(options[3]);
    userEvent.click(saveButton);

    await waitFor(() => expect(updateUserSpy).toHaveBeenCalledTimes(1));
  });

  it('updates permission properly', async () => {
    const updateUserSpy = jest.fn();
    const updateUserMock = {
      request: {
        query: updateUserMutation,
        variables: {
          input: {
            uuid: '1',
            role: Roles.TEACHER,
            permissions: {
              wblAdmin: true,
              counselor: false,
              canImpersonate: false,
              canBrowseReports: false,
            },
          },
        },
      },
      result() {
        updateUserSpy();

        return {
          data: {
            updateUser: {
              user: {
                uuid: '1',
                role: Roles.TEACHER,
                permissions: {
                  wblAdmin: true,
                  counselor: false,
                  canImpersonate: false,
                  canBrowseReports: false,
                },
              },
            },
          },
        };
      },
    };

    renderAdminAppUser({ mocks: [updateUserMock] });

    await waitFor(() =>
      expect(document.querySelectorAll('.select__control')[1]).toBeInTheDocument()
    );

    const selectTrigger = document.querySelectorAll('.select__control')[1]!;
    const saveButton = screen.getByRole('button', { name: 'Save' });

    userEvent.click(selectTrigger);

    const options = document.querySelectorAll('.select__option');

    userEvent.click(options[0]);
    userEvent.click(saveButton);

    await waitFor(() => expect(updateUserSpy).toHaveBeenCalledTimes(1));
  });
});
