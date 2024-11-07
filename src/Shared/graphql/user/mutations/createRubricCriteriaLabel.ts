import { gql } from '@apollo/client';

export default gql`
  mutation CreateRubricCriteriaLabel($input: CreateRubricCriteriaLabelMutationInput!) {
    createRubricCriteriaLabel(input: $input) {
      rubricCriteriaLabel {
        displayName
        id
        score
      }
    }
  }
`;
