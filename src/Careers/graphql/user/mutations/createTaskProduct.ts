import { gql, TypedDocumentNode } from '@apollo/client';

export const CREATE_TASK_PRODUCT: TypedDocumentNode<
  TCreateTaskProductData,
  TCreateTaskProductMutationInput
> = gql`
  mutation CreateTaskProduct($input: CreateProductMutationInput!) {
    createProduct(input: $input) {
      product {
        id
        displayName
        description
      }
    }
  }
`;

type TCreateTaskProductData = {
  createProduct: {
    product: {
      id: string;
      displayName: string;
      description: string;
    };
  };
};

export type TCreateTaskProductMutationInput = {
  input: {
    taskId: string;
    displayName: string;
    description: string;
  };
};
