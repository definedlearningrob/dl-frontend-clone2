import { gql } from '@apollo/client';

export default gql`
  query Videos($scope: ArchivableStatus, $page: Int, $perPage: Int, $filter: VideoFilter) {
    videos(scope: $scope, page: $page, perPage: $perPage, filter: $filter) {
      nodesCount
      pagesCount
      nodes {
        archivedAt
        description
        displayName
        filename
        id
        name
        url
      }
    }
  }
`;
