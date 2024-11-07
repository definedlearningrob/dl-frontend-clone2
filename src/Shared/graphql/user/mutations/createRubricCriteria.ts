import { gql } from '@apollo/client';

export default gql`
  mutation CreateRubricCriteria($input: CreateRubricCriteriaMutationInput!) {
    createRubricCriteria(input: $input) {
      rubricCriteria {
        id
        rubricCriteriaLabelId
        rubricHeadingId
        text
      }
    }
  }
`;
