import { gql } from '@apollo/client';

export default gql`
  query StudentConversationGroups($uuid: ID!, $first: Int, $after: String) {
    student(uuid: $uuid) {
      firstName
      lastName
      uuid
      conversationGroups(first: $first, after: $after) {
        edges {
          node {
            participant {
              uuid
              name
              members {
                uuid
                name
              }
              owner {
                uuid
                name
              }
            }
            recentConversation {
              id
              recentMessage {
                id
                body
                createdAt
              }
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
