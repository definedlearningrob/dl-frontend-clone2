import { gql } from '@apollo/client';

export default gql`
  mutation DeleteRubricHeading($input: DeleteRubricHeadingMutationInput!) {
    deleteRubricHeading(input: $input) {
      status
    }
  }
`;
