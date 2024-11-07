import { gql } from '@apollo/client';

export default gql`
  mutation UpdateRubric($input: UpdateRubricMutationInput!) {
    updateRubric(input: $input) {
      rubric {
        displayName
        id
        name
        description
        uuid
      }
    }
  }
`;
