import { gql } from '@apollo/client';

export default gql`
  query Attachments(
    $scope: ArchivableStatus
    $page: Int
    $perPage: Int
    $filter: AttachmentFilter
  ) {
    attachments(scope: $scope, page: $page, perPage: $perPage, filter: $filter) {
      nodesCount
      pagesCount
      nodes {
        archivedAt
        description
        displayName
        id
        name
        files {
          id
          filename
          url(options: { responseContentDisposition: "attachment" })
        }
      }
    }
  }
`;
