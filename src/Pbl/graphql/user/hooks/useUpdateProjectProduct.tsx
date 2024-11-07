import { useMutation } from '@apollo/client';

import UPDATE_PRODUCT, {
  TUpdateProductData,
  TUpdateProductVariables,
} from '../mutations/updateProjectProduct';

export const useUpdateProduct = (id: string) => {
  const [mutate, { loading }] = useMutation<TUpdateProductData, TUpdateProductVariables>(
    UPDATE_PRODUCT
  );

  const updateProduct = ({
    description,
    displayName,
  }: {
    description: string;
    displayName: string;
  }) =>
    mutate({
      variables: {
        input: {
          id,
          description,
          displayName,
        },
      },
    });

  return [updateProduct, { loading }] as const;
};
