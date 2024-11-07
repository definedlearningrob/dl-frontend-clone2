import { gql } from '@apollo/client';

export default gql`
  query ResearchLinks(
    $scope: ArchivableStatus
    $page: Int
    $perPage: Int
    $filter: ResearchLinkFilter
  ) {
    researchLinks(scope: $scope, page: $page, perPage: $perPage, filter: $filter) {
      nodesCount
      pagesCount
      nodes {
        archivedAt
        author
        displayName
        id
        name
        resourceLink
        sourceName
      }
    }
  }
`;
