import { gql } from '@apollo/client';

export default gql`
  mutation UpdateRubricCriteria($input: UpdateRubricCriteriaMutationInput!) {
    updateRubricCriteria(input: $input) {
      rubricCriteria {
        id
        rubricCriteriaLabelId
        rubricHeadingId
        text
      }
    }
  }
`;
