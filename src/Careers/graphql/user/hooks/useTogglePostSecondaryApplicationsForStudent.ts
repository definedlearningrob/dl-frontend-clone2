import { useMutation, ApolloError } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { TOGGLE_POST_SECONDARY_APPLICATIONS_FOR_STUDENTS_MUTATION } from '@dc/graphql/user/mutations/togglePostSecondaryApplicationsForStudents';

import { callToast } from '@shared/components/Toaster/Toaster';

export const useTogglePostSecondaryApplicationsForStudents = () => {
  const [toggleApplications, { loading }] = useMutation(
    TOGGLE_POST_SECONDARY_APPLICATIONS_FOR_STUDENTS_MUTATION
  );
  const { t } = useTranslation();

  const togglePostSecondaryApplicationsForStudents = async (
    studentUuids: string[],
    value: boolean
  ) => {
    try {
      await toggleApplications({
        variables: {
          input: {
            studentUuids,
            value,
          },
        },
        optimisticResponse: {
          togglePostSecondaryApplicationsForStudents: {
            students: studentUuids.map((studentUuid) => ({
              uuid: studentUuid,
              postSecondaryApplicationsStatus: {
                isEnabled: value,
                isOverridden: true,
              },
              __typename: 'Student',
            })),
          },
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

  return { togglePostSecondaryApplicationsForStudents, isLoading: loading };
};
