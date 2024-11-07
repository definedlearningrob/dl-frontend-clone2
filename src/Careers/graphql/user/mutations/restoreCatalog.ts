import { gql } from '@apollo/client';

export default gql`
  mutation RestoreCatalog($input: RestoreCatalogMutationInput!) {
    restoreCatalog(input: $input) {
      catalog {
        archivedAt
        id
      }
    }
  }
`;
