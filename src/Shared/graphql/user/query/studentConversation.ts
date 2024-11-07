import { gql } from '@apollo/client';

export default gql`
  query StudentConversation($uuid: ID!, $id: ID!, $first: Int, $after: String) {
    student(uuid: $uuid) {
      uuid
      conversation(id: $id) {
        id
        messages(first: $first, after: $after) {
          edges {
            node {
              author {
                uuid
                name
              }
              body
              createdAt
              id
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
  }
`;
