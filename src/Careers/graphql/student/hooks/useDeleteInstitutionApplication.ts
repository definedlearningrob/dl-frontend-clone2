import { ApolloError, useApolloClient, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import INSTITUTION_QUERY from '@dc/graphql/student/queries/institution';
import { DELETE_INSTITUTION_APPLICATION } from '@dc/graphql/student/mutations/deleteInstitutionApplication';

import { callToast } from '@shared/components/Toaster/Toaster';
import { removeFromCache } from '@shared/utils/graphql';

export const useDeleteInstitutionApplication = () => {
  const { t } = useTranslation();
  const client = useApolloClient();
  const [deleteInstitutionApplication, options] = useMutation(DELETE_INSTITUTION_APPLICATION);

  const handleDeleteInstitutionApplication = async (
    institutionApplicationId: string | null,
    institutionId: string
  ) => {
    if (!institutionApplicationId) {
      return;
    }

    try {
      await deleteInstitutionApplication({
        variables: { input: { institutionApplicationId } },
        update: removeFromCache({
          id: institutionApplicationId,
          __typename: 'InstitutionApplication',
        }),
        refetchQueries: [{ query: INSTITUTION_QUERY, variables: { id: institutionId } }],
      });
      client.cache.modify({
        id: client.cache.identify({ __typename: 'Institution', id: institutionId }),
        fields: {
          hasApplied() {
            return false;
          },
        },
      });
      callToast('success', t('postSecondary.institution.removeInstitutionApplicationSuccess'));
    } catch (error: ApolloError | unknown) {
      if (error instanceof ApolloError) {
        callToast('error', t('postSecondary.institution.removeInstitutionApplicationError'));
      } else {
        callToast('error', t('common.notifications.error.unknown'));
      }
    }
  };

  return [handleDeleteInstitutionApplication, options] as const;
};
