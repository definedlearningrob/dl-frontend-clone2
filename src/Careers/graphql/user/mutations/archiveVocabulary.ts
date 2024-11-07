import { gql } from '@apollo/client';

export default gql`
  mutation ArchiveVocabulary($input: ArchiveVocabularyMutationInput!) {
    archiveVocabulary(input: $input) {
      vocabulary {
        archivedAt
        id
      }
    }
  }
`;
