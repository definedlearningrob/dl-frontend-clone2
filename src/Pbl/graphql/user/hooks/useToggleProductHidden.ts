import { ApolloError, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { TOGGLE_PRODUCT_HIDDEN } from '@pbl/graphql/user/mutations/toggleProductHidden';

import { callToast } from '@shared/components/Toaster/Toaster';

type MutationParams = {
  taskId: string;
  productId: string;
  hidden: boolean;
};

export const useToggleProductHidden = () => {
  const [mutate, mutationOptions] = useMutation(TOGGLE_PRODUCT_HIDDEN);
  const { t } = useTranslation();

  const toggleProductHidden = async ({ taskId, productId, hidden }: MutationParams) => {
    try {
      await mutate({
        variables: {
          input: { taskId, productId },
        },
        optimisticResponse: {
          toggleProductHidden: {
            task: {
              id: taskId,
              products: [{ id: productId, hidden: !hidden, __typename: 'Product' }],
            },
          },
        },
      });
    } catch (error: ApolloError | unknown) {
      if (error instanceof ApolloError) {
        callToast('error', error.message);
      } else {
        callToast('error', t('common.error.unknown'));
      }
    }
  };

  return [toggleProductHidden, mutationOptions] as const;
};
