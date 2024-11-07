import { gql } from '@apollo/client';

export default gql`
  mutation CreateRubricHeading($input: CreateRubricHeadingMutationInput!) {
    createRubricHeading(input: $input) {
      rubricHeading {
        id
        multiplier
        name
      }
    }
  }
`;
