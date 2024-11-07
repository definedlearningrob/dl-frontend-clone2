import { gql } from '@apollo/client';

export default gql`
  mutation PerformFullContractSync($input: PerformFullContractSyncMutationInput!) {
    performFullContractSync(input: $input) {
      status
    }
  }
`;
