import { gql } from '@apollo/client';

export default gql`
  mutation UpdateVocabulary($input: UpdateVocabularyMutationInput!) {
    updateVocabulary(input: $input) {
      vocabulary {
        definition
        id
        term
      }
    }
  }
`;
