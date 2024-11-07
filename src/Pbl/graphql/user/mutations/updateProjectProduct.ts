import { gql } from '@apollo/client';

export default gql`
  mutation UpdateProjectProduct($input: UpdateProductMutationInput!) {
    updateProduct(input: $input) {
      product {
        id
        description
        displayName
      }
    }
  }
`;

export type TUpdateProductData = {
  updateProduct: {
    product: TUpdateProductDisplayName;
  };
};

export type TUpdateProductVariables = {
  input: TUpdateProductDisplayNameInput;
};

type TUpdateProductDisplayNameInput = {
  id: string;
  displayName: string;
  description: string;
};

type TUpdateProductDisplayName = {
  id: string;
  displayName: string;
  description: string;
};
