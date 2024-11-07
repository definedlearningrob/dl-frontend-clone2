import { ApolloError, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { DELETE_TAG } from '@dc/graphql/user/mutations/deleteTag';

import { callToast } from '@shared/components/Toaster/Toaster';
import { removeFromCache } from '@shared/utils/graphql';

export const useArchiveTag = () => {
  const [mutate, { loading, error }] = useMutation(DELETE_TAG);
  const { t } = useTranslation();
  const archiveTag = async (id: string) => {
    try {
      await mutate({
        variables: {
          input: { id },
        },
        update: removeFromCache({ id, __typename: 'Tag' }),
      });
      callToast('success', t('admin.performanceIndicators.archivedSuccess'));
    } catch (error: ApolloError | unknown) {
      if (error instanceof ApolloError) {
        callToast('error', error.message);
      } else {
        callToast('error', t('common.error.unknown'));
      }
    }
  };

  return { archiveTag, isLoading: loading, error };
};
