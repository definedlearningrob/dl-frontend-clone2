import { gql } from '@apollo/client';

export default gql`
  mutation DuplicateRubric($input: DuplicateRubricMutationInput!) {
    duplicateRubric(input: $input) {
      rubric {
        id
      }
    }
  }
`;
