import { gql } from '@apollo/client';

export default gql`
  query ExternalPresentations(
    $scope: ArchivableStatus
    $filter: ExternalPresentationFilter
    $page: Int
    $perPage: Int
  ) {
    externalPresentations(scope: $scope, filter: $filter, page: $page, perPage: $perPage) {
      nodes {
        archivedAt
        displayName
        id
        name
        source
      }
      nodesCount
      pagesCount
    }
  }
`;
