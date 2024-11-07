import userEvent from '@testing-library/user-event';
import { createMemoryHistory, MemoryHistory } from 'history';
import { InMemoryCache } from '@apollo/client';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { waitFor, screen, within } from '@testing-library/react';

import Users from '@dc/screens/AdminApp/Users/Users';
import usersQuery from '@dc/graphql/user/queries/systemAdminUsers';
import { PAGING } from '@dc/resources/constants';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { Roles } from '@dc/resources/enums';
import { userInfoMock } from '@dc/tests/mocks/userMocks';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

const getCache = () =>
  new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          adminDashboard: {
            merge: true,
          },
        },
      },
    },
  });

const defaultMocks = [
  {
    request: {
      query: usersQuery,
      variables: {
        filter: {},
        page: PAGING.PAGE_DEFAULT,
        perPage: PAGING.PER_PAGE_DEFAULT.value,
      },
    },
    result: {
      data: {
        adminDashboard: {
          users: {
            pagesCount: 1,
            nodesCount: 4,
            nodes: [
              {
                firstName: 'Bruce',
                gradingNeeded: false,
                lastName: 'Wayne',
                uuid: '1',
                schoolClassesCount: 1,
                entity: { name: 'first entity', parent: null, uuid: '1' },
                role: Roles.TEACHER,
              },
              {
                firstName: 'Peter',
                lastName: 'Parker',
                gradingNeeded: false,
                uuid: '2',
                schoolClassesCount: 1,
                entity: { name: 'second entity', parent: null, uuid: '2' },
                role: Roles.ENTITY_ADMIN,
              },
              {
                firstName: 'Tony',
                lastName: 'Stark',
                gradingNeeded: false,
                uuid: '3',
                schoolClassesCount: 1,
                entity: { name: 'third entity', parent: null, uuid: '3' },
                role: Roles.SALES_ADMIN,
              },
              {
                firstName: 'Captain',
                lastName: 'America',
                gradingNeeded: false,
                uuid: '4',
                schoolClassesCount: 1,
                entity: { name: 'fourth entity', parent: null, uuid: '4' },
                role: Roles.SYSTEM_ADMIN,
              },
            ],
          },
          userId: '1',
        },
      },
    },
  },
];

const renderAdminAppUsers = ({
  history,
  mocks = [],
}: { history?: MemoryHistory; mocks?: MockedResponse[] } = {}) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider cache={getCache()} mocks={[...defaultMocks, ...mocks, userInfoMock]}>
      <UserInfoProvider>
        <NavigationContextProvider>
          <Users />
        </NavigationContextProvider>
      </UserInfoProvider>
    </MockedProvider>,
    { history }
  );

describe('AdminAppUsers', () => {
  it('renders list properly', async () => {
    renderAdminAppUsers();

    const userList = await screen.findByRole('table');
    const tableRows = within(userList).getAllByRole('row');
    const [header, ...users] = tableRows;
    const headerCells = within(header).getAllByRole('columnheader');

    expect(headerCells[0]).toHaveTextContent('Name');
    expect(headerCells[1]).toHaveTextContent('Role');
    expect(headerCells[2]).toHaveTextContent('Entity');

    expect(users).toHaveLength(4);

    expect(within(users[0]).getAllByRole('cell')[0]).toHaveTextContent('Bruce Wayne');
    expect(within(users[0]).getAllByRole('cell')[1]).toHaveTextContent('Teacher');
    expect(within(users[0]).getAllByRole('cell')[2]).toHaveTextContent('first entity');

    expect(within(users[1]).getAllByRole('cell')[0]).toHaveTextContent('Peter Parker');
    expect(within(users[1]).getAllByRole('cell')[1]).toHaveTextContent('Entity Admin');
    expect(within(users[1]).getAllByRole('cell')[2]).toHaveTextContent('second entity');

    expect(within(users[2]).getAllByRole('cell')[0]).toHaveTextContent('Tony Stark');
    expect(within(users[2]).getAllByRole('cell')[1]).toHaveTextContent('Sales Admin');
    expect(within(users[2]).getAllByRole('cell')[2]).toHaveTextContent('third entity');

    expect(within(users[3]).getAllByRole('cell')[0]).toHaveTextContent('Captain America');
    expect(within(users[3]).getAllByRole('cell')[1]).toHaveTextContent('System Admin');
    expect(within(users[3]).getAllByRole('cell')[2]).toHaveTextContent('fourth entity');
  });

  it('redirects properly', async () => {
    const history = createMemoryHistory({ initialEntries: ['/admin/users'] });
    const pushSpy = jest.fn();
    history.push = pushSpy;

    renderAdminAppUsers({ history });

    const userList = await screen.findByRole('table');
    const tableRows = within(userList).getAllByRole('row');
    const [_, ...users] = tableRows;

    userEvent.click(within(users[0]).getByRole('button', { name: 'Show' }));

    expect(pushSpy).toHaveBeenCalledTimes(1);
    expect(pushSpy).toHaveBeenCalledWith('/admin/users/1');
  });

  it('filters properly', async () => {
    const filterSpy = jest.fn();
    const filterMock = {
      request: {
        query: usersQuery,
        variables: {
          filter: { searchableColumnsCont: 'b' },
          page: PAGING.PAGE_DEFAULT,
          perPage: PAGING.PER_PAGE_DEFAULT.value,
        },
      },
      result() {
        filterSpy();

        return {
          data: {
            adminDashboard: {
              users: {
                pagesCount: 1,
                nodesCount: 1,
                nodes: [
                  {
                    firstName: 'Bruce',
                    gradingNeeded: false,
                    lastName: 'Wayne',
                    uuid: '1',
                    schoolClassesCount: 1,
                    entity: { name: 'first entity', parent: null, uuid: '1' },
                    role: Roles.TEACHER,
                  },
                ],
              },
              userId: '1',
            },
          },
        };
      },
    };

    renderAdminAppUsers({ mocks: [filterMock] });

    const input = screen.getByRole('textbox');

    userEvent.paste(input, 'b');

    await waitFor(() => expect(filterSpy).toHaveBeenCalledTimes(1));
  });
});
