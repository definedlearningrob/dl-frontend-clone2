import { gql } from '@apollo/client';

export default gql`
  query UsersOfEntity($uuid: ID!, $page: Int, $perPage: Int, $filter: UserFilter) {
    entity(uuid: $uuid) {
      users(page: $page, perPage: $perPage, filter: $filter) {
        pagesCount
        nodesCount
        nodes {
          firstName
          lastName
          role
          uuid
          gradingNeeded
        }
      }
      uuid
    }
  }
`;
