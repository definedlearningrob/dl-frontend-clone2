import { gql } from '@apollo/client';

export default gql`
  query Texts($scope: ArchivableStatus, $page: Int, $perPage: Int, $filter: TextFilter) {
    texts(scope: $scope, page: $page, perPage: $perPage, filter: $filter) {
      nodesCount
      pagesCount
      nodes {
        archivedAt
        content
        displayName
        id
        name
      }
    }
  }
`;
