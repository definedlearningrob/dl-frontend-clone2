import { useMutation, ApolloError } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { RESET_POST_SECONDARY_APPLICATIONS_FOR_STUDENT_MUTATION } from '@dc/graphql/user/mutations/resetPostSecondaryApplicationsForStudent';

import { callToast } from '@shared/components/Toaster/Toaster';

export const useResetPostSecondaryApplicationsForStudent = () => {
  const [resetApplications, { loading }] = useMutation(
    RESET_POST_SECONDARY_APPLICATIONS_FOR_STUDENT_MUTATION
  );
  const { t } = useTranslation();

  const resetPostSecondaryApplicationsForStudent = async (studentUuid: string) => {
    try {
      await resetApplications({
        variables: {
          input: { studentUuid },
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

  return { resetPostSecondaryApplicationsForStudent, isLoading: loading };
};
