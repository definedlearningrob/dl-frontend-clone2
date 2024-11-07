import { gql } from '@apollo/client';

export default gql`
  query DlStudentConversations(
    $uuid: ID!
    $first: Int
    $after: String
    $with: ConversationParticipantFilter!
  ) {
    student(uuid: $uuid) {
      uuid
      conversations(first: $first, after: $after, with: $with) {
        edges {
          node {
            conversationContext {
              id
              name
            }
            id
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
  }
`;
