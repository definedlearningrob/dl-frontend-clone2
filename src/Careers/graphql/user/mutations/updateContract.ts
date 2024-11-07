import { gql } from '@apollo/client';

export default gql`
  mutation UpdateContract($input: UpdateContractMutationInput!) {
    updateContract(input: $input) {
      contract {
        id
        uuid
        syncable
      }
    }
  }
`;
