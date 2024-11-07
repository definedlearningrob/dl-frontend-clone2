import { ApolloError, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { CREATE_BADGE, TBadgeInput } from '@dc/graphql/user/mutations/createBadge';
import { BADGES } from '@dc/graphql/user/queries/badges';

import { callToast } from '@shared/components/Toaster/Toaster';

export const useCreateBadge = () => {
  const [mutate, { loading }] = useMutation(CREATE_BADGE);
  const { t } = useTranslation();

  const createBadge = async (badge: TBadgeInput) => {
    try {
      await mutate({
        variables: {
          input: badge,
        },
        refetchQueries: [{ query: BADGES }],
      });
      callToast('success', t('admin.badges.badgeCreated'));
    } catch (error: ApolloError | unknown) {
      if (error instanceof ApolloError) {
        callToast('error', error.message);
      } else {
        callToast('error', t('common.error.unknown'));
      }
    }
  };

  return { createBadge, loading };
};
