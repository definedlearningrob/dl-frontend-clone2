import { gql } from '@apollo/client';

export default gql`
  mutation ArchiveCatalog($input: ArchiveCatalogMutationInput!) {
    archiveCatalog(input: $input) {
      catalog {
        archivedAt
        id
      }
    }
  }
`;
