import { gql } from '@apollo/client';

export default gql`
  mutation UpdateRubricCriteriaLabel($input: UpdateRubricCriteriaLabelMutationInput!) {
    updateRubricCriteriaLabel(input: $input) {
      rubricCriteriaLabel {
        displayName
        id
        score
      }
    }
  }
`;
