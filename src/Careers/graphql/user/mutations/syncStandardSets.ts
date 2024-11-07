import { gql } from '@apollo/client';

export default gql`
  mutation SyncStandardSets($input: SyncStandardSetsMutationInput!) {
    syncStandardSets(input: $input) {
      status
    }
  }
`;
