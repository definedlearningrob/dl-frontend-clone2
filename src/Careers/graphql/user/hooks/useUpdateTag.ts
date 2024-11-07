import { useTranslation } from 'react-i18next';
import { ApolloError, useMutation } from '@apollo/client';
import { GraphQLError } from 'graphql';

import { TTagInput } from '@dc/graphql/user/mutations/createTag';
import { UPDATE_TAG } from '@dc/graphql/user/mutations/updateTag';

import { callToast } from '@shared/components/Toaster/Toaster';
import { getFormErrors } from '@shared/utils/graphql';

export const useUpdateTag = () => {
  const [mutate, { loading }] = useMutation(UPDATE_TAG);
  const { t } = useTranslation();

  const updateTag = async (tag: TTagInput) => {
    try {
      await mutate({
        variables: {
          input: tag,
        },
      });
      callToast('success', t('admin.performanceIndicators.updateSuccess'));
    } catch (error: ApolloError | unknown) {
      const errors = getFormErrors<ApolloError>(error as { graphQLErrors: GraphQLError[] });

      callToast(
        'error',
        error instanceof ApolloError
          ? t('admin.performanceIndicators.saveError', { error: errors.name })
          : t('common.error.unknown')
      );

      return error;
    }
  };

  return { updateTag, loading };
};
