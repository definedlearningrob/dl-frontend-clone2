import { ApolloError, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { SET_ENTITY_TAGS } from '@dc/graphql/user/mutations/setEntityTags';

import { callToast } from '@shared/components/Toaster/Toaster';

export const useSetEntityTags = () => {
  const [mutate, { loading }] = useMutation(SET_ENTITY_TAGS);
  const { t } = useTranslation();

  const setEntityTags = async (entityUuid: string, tagIds: string[], applyToHierarchy: boolean) => {
    try {
      await mutate({
        variables: {
          input: { entityUuid, tagIds, applyToHierarchy },
        },
      });
      callToast('success', t('admin.performanceIndicators.saveSuccess'));
    } catch (error: ApolloError | unknown) {
      if (error instanceof ApolloError) {
        callToast('error', t('admin.entities.settings.error'));
      } else {
        callToast('error', t('admin.entities.customizeMessage.customizationError'));
      }
    }
  };

  return { setEntityTags, isLoading: loading };
};
