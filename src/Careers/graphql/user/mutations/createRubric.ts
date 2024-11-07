import { gql } from '@apollo/client';

export default gql`
  mutation CreateRubric($input: CreateRubricMutationInput!) {
    createRubric(input: $input) {
      rubric {
        description
        displayName
        id
        name
      }
    }
  }
`;
