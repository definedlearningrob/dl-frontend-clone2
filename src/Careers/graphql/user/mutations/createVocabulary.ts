import { gql } from '@apollo/client';

export default gql`
  mutation CreateVocabulary($input: CreateVocabularyMutationInput!) {
    createVocabulary(input: $input) {
      vocabulary {
        definition
        id
        term
      }
    }
  }
`;
