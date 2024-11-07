import { gql } from '@apollo/client';

export default gql`
  mutation PerformContractsSync($input: PerformContractsSyncMutationInput!) {
    performContractsSync(input: $input) {
      status
    }
  }
`;
