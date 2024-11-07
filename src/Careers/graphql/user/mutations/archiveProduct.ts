import { gql } from '@apollo/client';

export default gql`
  mutation ArchiveProduct($input: ArchiveProductMutationInput!) {
    archiveProduct(input: $input) {
      product {
        archivedAt
        id
      }
    }
  }
`;
