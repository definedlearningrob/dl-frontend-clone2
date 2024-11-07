import { gql } from '@apollo/client';

export default gql`
  query Announcements($after: String, $before: String, $first: Int, $last: Int) {
    announcements(after: $after, before: $before, first: $first, last: $last) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      edges {
        cursor
        node {
          author {
            uuid
            firstName
            lastName
            username
          }
          body
          createdAt
          id
          name
          target {
            name
            uuid
          }
        }
      }
    }
  }
`;
