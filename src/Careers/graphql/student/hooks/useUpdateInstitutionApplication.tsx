import { useMutation, ApolloError } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import {
  TUpdateInstitutionApplicationVariables,
  UPDATE_INSTITUTION_APPLICATION,
} from '@dc/graphql/student/mutations/updateInstitutionApplication';

import { callToast } from '@shared/components/Toaster/Toaster';

export const useUpdateInstitutionApplication = () => {
  const [mutate, { loading }] = useMutation(UPDATE_INSTITUTION_APPLICATION);
  const { t } = useTranslation();

  const updateInstitutionApplication = async ({
    institutionApplicationId,
    status,
  }: TUpdateInstitutionApplicationVariables['input']) => {
    await mutate({
      variables: { input: { institutionApplicationId, status } },
      update(cache) {
        cache.modify({
          id: cache.identify({
            id: institutionApplicationId,
            __typename: 'InstitutionApplication',
          }),
          fields: {
            status() {
              return status;
            },
          },
        });
      },
    }).catch((e) => {
      if (e instanceof ApolloError) {
        callToast('error', e.message);
      } else {
        callToast('error', t('common.notifications.error.unknown'));
      }
    });
  };

  return [updateInstitutionApplication, { loading }] as const;
};
