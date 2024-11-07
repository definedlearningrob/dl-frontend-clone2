import { gql } from '@apollo/client';

export default gql`
  query Vocabularies(
    $scope: ArchivableStatus
    $page: Int
    $perPage: Int
    $filter: VocabularyFilter
  ) {
    vocabularies(scope: $scope, page: $page, perPage: $perPage, filter: $filter) {
      nodesCount
      pagesCount
      nodes {
        archivedAt
        definition
        id
        term
        name: term
      }
    }
  }
`;
