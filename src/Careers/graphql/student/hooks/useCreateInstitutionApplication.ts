import { ApolloError, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { INSTITUTION_APPLICATIONS } from '@dc/graphql/student/queries/institutionApplications';
import {
  CREATE_INSTITUTION_APPLICATION,
  TCreateInstitutionApplicationData,
} from '@dc/graphql/student/mutations/createInstitutionApplication';

import { callToast } from '@shared/components/Toaster/Toaster';

type Params = {
  institutionId: string;
  onCompleted?: (data: TCreateInstitutionApplicationData) => void;
};

export const useCreateInstitutionApplication = ({ institutionId, onCompleted }: Params) => {
  const { t } = useTranslation();
  const [createInstitutionApplication, options] = useMutation(CREATE_INSTITUTION_APPLICATION, {
    onCompleted,
  });

  const handleCreateInstitutionApplication = async () => {
    try {
      await createInstitutionApplication({
        variables: { input: { institutionId } },
        refetchQueries: [{ query: INSTITUTION_APPLICATIONS, variables: { page: 1, perPage: 100 } }],
      });
      callToast('success', t('postSecondary.institution.createInstitutionApplicationSuccess'));
    } catch (error: ApolloError | unknown) {
      if (error instanceof ApolloError) {
        callToast('error', t('postSecondary.institution.createInstitutionApplicationError'));
      } else {
        callToast('error', t('common.notifications.error.unknown'));
      }
    }
  };

  return [handleCreateInstitutionApplication, options] as const;
};
