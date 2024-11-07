import { gql } from '@apollo/client';

export default gql`
  query Conversations($first: Int, $after: String, $with: ConversationParticipantFilter) {
    conversations(first: $first, after: $after, with: $with) {
      edges {
        node {
          conversationContext {
            id
            name
          }
          id
          messagesRead
          serviceName
          recentMessage {
            id
            body
            createdAt
          }
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
    }
  }
`;
