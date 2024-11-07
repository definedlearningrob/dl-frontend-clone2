import { gql } from '@apollo/client';

export default gql`
  query Entities($page: Int, $perPage: Int, $filter: EntityFilter) {
    entities(page: $page, perPage: $perPage, filter: $filter) {
      pagesCount
      nodesCount
      nodes {
        uuid
        gradingNeeded
        name
      }
    }
  }
`;
