import { gql } from '@apollo/client';

import { NOTIFICATION_TYPES } from '@shared/resources/constants';

export default gql`
  mutation MarkAllNotificationsAsRead($input: MarkAllNotificationsAsReadMutationInput!) {
    markAllNotificationsAsRead(input: $input) {
      status
    }
  }
`;

export type TMarkAllNotificationsData = {
  markAllNotificationsAsRead: {
    status: string;
  };
};

export type TMarkAllNotificationsVariables = {
  input: { type?: NOTIFICATION_TYPES };
};
