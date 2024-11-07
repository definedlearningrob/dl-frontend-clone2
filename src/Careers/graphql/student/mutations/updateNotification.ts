import { gql } from '@apollo/client';

export default gql`
  mutation UpdateNotification($input: UpdateNotificationMutationInput!) {
    updateNotification(input: $input) {
      notification {
        id
        read
      }
    }
  }
`;
