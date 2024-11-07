import { gql } from '@apollo/client';

export default gql`
  query EntityWithChildren($uuid: ID!, $page: Int, $perPage: Int, $filter: EntityFilter) {
    entity(uuid: $uuid) {
      name
      children(filter: $filter, page: $page, perPage: $perPage) {
        pagesCount
        nodesCount
        nodes {
          uuid
          gradingNeeded
          name
        }
      }
      uuid
    }
  }
`;
