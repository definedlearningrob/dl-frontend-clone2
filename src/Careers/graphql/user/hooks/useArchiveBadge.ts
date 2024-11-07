import { ApolloError, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { ARCHIVE_BADGE } from '@dc/graphql/user/mutations/archiveBadge';
import { BADGES } from '@dc/graphql/user/queries/badges';

import { callToast } from '@shared/components/Toaster/Toaster';

export const useArchiveBadge = () => {
  const [mutate, { loading }] = useMutation(ARCHIVE_BADGE);
  const { t } = useTranslation();

  const archiveBadge = async (id: string) => {
    try {
      await mutate({
        variables: {
          input: { id },
        },
        refetchQueries: [{ query: BADGES }],
      });
    } catch (error: ApolloError | unknown) {
      if (error instanceof ApolloError) {
        callToast('error', error.message);
      } else {
        callToast('error', t('common.error.unknown'));
      }
    }
  };

  return { archiveBadge, isLoading: loading };
};
