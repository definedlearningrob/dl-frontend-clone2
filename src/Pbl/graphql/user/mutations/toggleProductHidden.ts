import { TypedDocumentNode, gql } from '@apollo/client';

export const TOGGLE_PRODUCT_HIDDEN: TypedDocumentNode<
  TToggleProductHiddenData,
  TToggleProductHiddenMutationInput
> = gql`
  mutation ToggleProductHidden($input: ToggleProductHiddenMutationInput!) {
    toggleProductHidden(input: $input) {
      task {
        id
        products {
          id
          hidden
        }
      }
    }
  }
`;

type TToggleProductHiddenData = {
  toggleProductHidden: {
    task: {
      id: string;
      products: {
        id: string;
        hidden: boolean;
        __typename: 'Product';
      }[];
    };
  };
};

type TToggleProductHiddenMutationInput = {
  input: {
    taskId: string;
    productId: string;
  };
};
