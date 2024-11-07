import { ApolloError, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { TBadgeInputUpdate, UPDATE_BADGE } from '@dc/graphql/user/mutations/updateBadge';

import { callToast } from '@shared/components/Toaster/Toaster';

export const useUpdateBadge = () => {
  const [mutate, { loading }] = useMutation(UPDATE_BADGE);
  const { t } = useTranslation();

  const updateBadge = async (badge: TBadgeInputUpdate) => {
    try {
      await mutate({
        variables: {
          input: badge,
        },
      });

      callToast('success', t('admin.badges.badgeUpdated'));
    } catch (error: ApolloError | unknown) {
      if (error instanceof ApolloError) {
        callToast('error', error.message);
      } else {
        callToast('error', t('common.error.unknown'));
      }
    }
  };

  return { updateBadge, isLoading: loading };
};
