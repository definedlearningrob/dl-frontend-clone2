import { ApolloError, MutationFunctionOptions, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { GraphQLError } from 'graphql';

import {
  CREATE_TAG,
  TCreateTagData,
  TCreateTagVariables,
  TTagInput,
} from '@dc/graphql/user/mutations/createTag';

import { callToast } from '@shared/components/Toaster/Toaster';
import { getFormErrors } from '@shared/utils/graphql';

export const useCreateTag = () => {
  const [mutate, { loading }] = useMutation(CREATE_TAG);
  const { t } = useTranslation();

  const createTag = async (
    tag: TTagInput,
    options?: Omit<MutationFunctionOptions<TCreateTagData, TCreateTagVariables>, 'variables'>
  ) => {
    try {
      const result = await mutate({
        variables: {
          input: tag,
        },
        ...options,
      });
      callToast('success', t('admin.performanceIndicators.createSuccess'));

      return { result };
    } catch (error: ApolloError | unknown) {
      const errors = getFormErrors<ApolloError>(error as { graphQLErrors: GraphQLError[] });

      callToast(
        'error',
        error instanceof ApolloError
          ? t('admin.performanceIndicators.saveError', { error: errors.name })
          : t('common.error.unknown')
      );

      return { error };
    }
  };

  return { createTag, loading };
};
