import { gql } from '@apollo/client';

export default gql`
  query Assignments(
    $scope: ArchivableStatus
    $page: Int
    $perPage: Int
    $filter: AssignmentFilter
  ) {
    assignments(scope: $scope, page: $page, perPage: $perPage, filter: $filter) {
      nodesCount
      pagesCount
      nodes {
        archivedAt
        assetName
        name: assetName
        description
        displayName
        id
        rubrics {
          id
          name
          description
        }
      }
    }
  }
`;
