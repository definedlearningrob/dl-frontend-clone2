import { gql } from '@apollo/client';

export default gql`
  mutation UpdateProduct($input: UpdateProductMutationInput!) {
    updateProduct(input: $input) {
      product {
        archivedAt
        description
        displayName
        id
        name
        rubricsUrl
      }
    }
  }
`;
