import { gql } from '@apollo/client';

export default gql`
  mutation ClearCache($input: ClearCacheMutationInput!) {
    clearCache(input: $input) {
      status
    }
  }
`;
