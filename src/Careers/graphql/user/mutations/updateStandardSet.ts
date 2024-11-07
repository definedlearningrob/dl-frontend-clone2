import { gql } from '@apollo/client';

export default gql`
  mutation UpdateStandardSet($input: UpdateStandardSetMutationInput!) {
    updateStandardSet(input: $input) {
      standardSet {
        displayName
        id
      }
    }
  }
`;
