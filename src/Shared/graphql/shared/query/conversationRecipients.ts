import { gql } from '@apollo/client';

export default gql`
  query ConversationRecipients($filter: ConversationRecipientFilter) {
    conversationRecipients(filter: $filter) {
      nodes {
        name
        recipientType
        uuid: recipientUuid
      }
    }
  }
`;
