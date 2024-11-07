import { ApolloError, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import {
  TOGGLE_ENTITY_REPORT,
  TToggleEntityReportInput,
} from '@dc/graphql/user/mutations/toggleEntityReport';

import { callToast } from '@shared/components/Toaster/Toaster';

export const useToggleEntityReport = () => {
  const [mutate, { loading }] = useMutation(TOGGLE_ENTITY_REPORT);
  const { t } = useTranslation();

  const toggleEntityReport = async (goals: TToggleEntityReportInput) => {
    try {
      await mutate({
        variables: {
          input: goals,
        },
      });
      callToast('success', t('admin.entities.goals.reportUpdated'));
    } catch (error: ApolloError | unknown) {
      if (error instanceof ApolloError) {
        callToast('error', error.message);
      } else {
        callToast('error', t('common.error.unknown'));
      }
    }
  };

  return { toggleEntityReport, loading };
};
