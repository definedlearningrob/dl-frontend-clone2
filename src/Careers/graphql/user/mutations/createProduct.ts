import { gql } from '@apollo/client';

export default gql`
  mutation CreateProduct($input: CreateProductMutationInput!) {
    createProduct(input: $input) {
      product {
        description
        displayName
        id
        rubricsUrl
        name
      }
    }
  }
`;
