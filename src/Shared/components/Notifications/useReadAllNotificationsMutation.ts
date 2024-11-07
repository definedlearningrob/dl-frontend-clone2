import { gql, useMutation } from '@apollo/client';

import markAllNotificationsAsReadMutation, {
  TMarkAllNotificationsData,
  TMarkAllNotificationsVariables,
} from '@shared/graphql/student/mutations/markAllNotificationsAsRead';
import { NOTIFICATION_TYPES } from '@shared/resources/constants';
import { Notification } from '@shared/components/Notifications/types';

export const useReadAllNotificationsMutation = () => {
  const [readAll] = useMutation<TMarkAllNotificationsData, TMarkAllNotificationsVariables>(
    markAllNotificationsAsReadMutation
  );

  const markAllNotificationsAsRead = async (type?: NOTIFICATION_TYPES) => {
    await readAll({
      variables: { input: { ...(type && { type }) } },
      update(cache) {
        cache.modify({
          fields: {
            notifications(existing, { readField }) {
              const newRefs = existing.nodes.map((ref: Notification) => {
                const newNotification = {
                  __typename: 'Notification',
                  id: readField('id', ref),
                  body: readField('body', ref),
                  read: true,
                  updatedAt: readField('updatedAt', ref),
                };

                return cache.writeFragment({
                  data: newNotification,
                  fragment: gql(`
                      fragment UpdatedNotification on Notification {
                        id,
                        body,
                        read,
                        updatedAt
                      }
                    `),
                });
              });

              return { ...existing, nodes: newRefs };
            },
          },
        });
      },
    });
  };

  return [markAllNotificationsAsRead] as const;
};
