import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, waitFor, screen } from '@testing-library/react';

import updateNotificationMutation from '@dc/graphql/student/mutations/updateNotification';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import notificationsQuery from '@dc/graphql/student/queries/notifications';
import { userInfoMock } from '@dc/tests/mocks/userMocks';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
import { Notifications } from '@shared/components/Notifications';
import { NOTIFICATION_SCOPES, NOTIFICATION_TYPES } from '@shared/resources/constants';
import markAllNotificationsAsReadMutation from '@shared/graphql/student/mutations/markAllNotificationsAsRead';
import { NotificationsProvider } from '@shared/hooks/useNotifications';

const defaultMocks = [
  {
    request: {
      query: notificationsQuery,
      variables: {
        page: 1,
        perPage: 10,
        scope: NOTIFICATION_SCOPES.ALL,
        type: NOTIFICATION_TYPES.GENERAL,
      },
    },
    result: () => ({
      data: {
        notifications: {
          nodes: [
            {
              id: '1',
              body: 'first notification',
              read: false,
              updatedAt: '2020-11-02',
              type: 'GENERAL',
              actor: null,
              target: null,
            },
            {
              id: '2',
              body: 'second notification',
              read: false,
              updatedAt: '2020-11-02',
              type: 'GENERAL',
              actor: null,
              target: null,
            },
            {
              id: '3',
              body: 'third notification',
              read: false,
              updatedAt: '2020-11-02',
              type: 'GENERAL',
              actor: null,
              target: null,
            },
            {
              id: '4',
              body: 'fourth notification',
              read: true,
              updatedAt: '2020-11-02',
              type: 'GENERAL',
              actor: null,
              target: null,
            },
            {
              id: '5',
              body: 'fifth notification',
              read: true,
              updatedAt: '2020-11-02',
              type: 'GENERAL',
              actor: null,
              target: null,
            },
            {
              id: '6',
              body: 'sixth notification',
              read: true,
              updatedAt: '2020-11-02',
              type: 'GENERAL',
              actor: null,
              target: null,
            },
          ],
          pagesCount: 1,
          nodesCount: 6,
        },
      },
    }),
  },
  {
    request: {
      query: notificationsQuery,
      variables: {
        scope: NOTIFICATION_SCOPES.UNREAD,
        type: NOTIFICATION_TYPES.GENERAL,
      },
    },
    result: () => ({
      data: {
        notifications: {
          nodes: [
            {
              id: '1',
              body: 'first notification',
              read: false,
              updatedAt: '2020-11-02',
              type: 'GENERAL',
            },
            {
              id: '2',
              body: 'second notification',
              read: false,
              updatedAt: '2020-11-02',
              type: 'GENERAL',
            },
            {
              id: '3',
              body: 'third notification',
              read: false,
              updatedAt: '2020-11-02',
              type: 'GENERAL',
            },
          ],
          pagesCount: 1,
          nodesCount: 3,
        },
      },
    }),
  },
  userInfoMock,
];

const renderNotifications = (mocks) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider mocks={mocks || defaultMocks}>
      <NavigationContextProvider>
        <NotificationsProvider userInfo={{ unreadNotificationsCount: 3 }}>
          <Notifications type={NOTIFICATION_TYPES.GENERAL} />
        </NotificationsProvider>
      </NavigationContextProvider>
    </MockedProvider>
  );

describe.skip('AppHeaderNotifications', () => {
  it('shows returned all notifications in notifications dropdown', async () => {
    renderNotifications();

    const dropdownTrigger = await screen.findByTestId('notifications-dropdown-trigger');
    fireEvent.click(dropdownTrigger);

    const notifications = await screen.findAllByTestId('dropdown-content');

    expect(notifications).toHaveLength(6);
    expect(notifications[0]).toHaveTextContent('first notification');
    expect(notifications[1]).toHaveTextContent('second notification');
    expect(notifications[2]).toHaveTextContent('third notification');
    expect(notifications[3]).toHaveTextContent('fourth notification');
    expect(notifications[4]).toHaveTextContent('fifth notification');
    expect(notifications[5]).toHaveTextContent('sixth notification');
  });

  it('shows proper unreads label based on user info unreads count', async () => {
    const { getByTestId } = renderNotifications();

    await waitFor(() => {
      expect(getByTestId(/unread-label/)).toHaveTextContent(3);
    });
  });

  it('calls update notification on particular notification click and update unread count', async () => {
    const updateSpy = jest.fn();

    const mocks = [
      ...defaultMocks,
      {
        request: {
          query: updateNotificationMutation,
          variables: { input: { id: '1', read: true } },
        },
        result: () => {
          updateSpy();

          return { data: { updateNotification: { notification: { id: '1', read: true } } } };
        },
      },
    ];

    const { getByTestId, getAllByTestId } = renderNotifications(mocks);

    const dropdownTrigger = await screen.findByTestId('notifications-dropdown-trigger');
    await waitFor(() => fireEvent.mouseDown(dropdownTrigger));
    await waitFor(() => fireEvent.click(getAllByTestId(/notification-option/)[0]));

    await waitFor(() => {
      expect(getByTestId(/unread-label/)).toHaveTextContent(2);
      expect(updateSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('does not call and not update label when notification is read', async () => {
    const updateSpy = jest.fn();

    const mocks = [
      ...defaultMocks,
      {
        request: {
          query: updateNotificationMutation,
          variables: { input: { id: '4', read: true } },
        },
        result: () => {
          updateSpy();

          return { data: { updateNotification: { notification: { id: '4', read: true } } } };
        },
      },
    ];

    const { getByTestId, getAllByTestId } = renderNotifications(mocks);

    const dropdownTrigger = await screen.findByTestId('notifications-dropdown-trigger');
    await waitFor(() => fireEvent.mouseDown(dropdownTrigger));
    await waitFor(() => fireEvent.click(getAllByTestId(/notification-option/)[3]));

    await waitFor(() => {
      expect(getByTestId(/unread-label/)).toHaveTextContent(3);
      expect(updateSpy).toHaveBeenCalledTimes(0);
    });
  });

  it('calls read all mutation and clear unread label', async () => {
    const readAllSpy = jest.fn();

    const mocks = [
      ...defaultMocks,
      {
        request: {
          query: markAllNotificationsAsReadMutation,
          variables: {
            input: {
              type: NOTIFICATION_TYPES.GENERAL,
            },
          },
        },
        result: () => {
          readAllSpy();

          return {
            data: {
              markAllNotificationsAsRead: {
                status: 'ok',
              },
            },
          };
        },
      },
    ];

    const { getByTestId, queryByTestId } = renderNotifications(mocks);

    const dropdownTrigger = await screen.findByTestId('notifications-dropdown-trigger');
    await waitFor(() => fireEvent.mouseDown(dropdownTrigger));
    await waitFor(() => fireEvent.click(getByTestId(/read-all-notifications/)));

    await waitFor(() => {
      expect(queryByTestId(/unread-label/)).not.toBeInTheDocument();
      expect(readAllSpy).toHaveBeenCalledTimes(1);
    });
  });
});
