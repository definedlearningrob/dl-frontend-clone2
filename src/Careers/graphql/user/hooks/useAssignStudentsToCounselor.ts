import { useMutation, ApolloError } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { callToast } from '@shared/components/Toaster/Toaster';

import { ASSIGN_STUDENTS_TO_COUNSELOR } from '../mutations/assignStudentsToCounselor';

export const useAssignStudentsToCounselor = () => {
  const [mutate, { loading }] = useMutation(ASSIGN_STUDENTS_TO_COUNSELOR);
  const { t } = useTranslation();

  const assignStudentsToCounselor = async (studentUuids: string[]) => {
    try {
      await mutate({
        variables: {
          input: { studentUuids },
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

  return { assignStudentsToCounselor, isLoading: loading };
};
