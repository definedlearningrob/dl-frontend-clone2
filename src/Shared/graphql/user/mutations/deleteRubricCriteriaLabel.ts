import { gql } from '@apollo/client';

export default gql`
  mutation DeleteRubricCriteriaLabel($input: DeleteRubricCriteriaLabelMutationInput!) {
    deleteRubricCriteriaLabel(input: $input) {
      status
    }
  }
`;
