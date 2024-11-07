import { gql } from '@apollo/client';

export default gql`
  query StandardSets($page: Int, $perPage: Int, $filter: StandardSetFilter) {
    standardSets(filter: $filter, page: $page, perPage: $perPage) {
      nodesCount
      pagesCount
      nodes {
        archivedAt
        displayName
        id
        name
        setId
      }
    }
  }
`;
