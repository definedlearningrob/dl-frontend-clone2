import { useMutation, ApolloError } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { RECOMMEND_OPPORTUNITY } from '@dc/graphql/user/mutations/recommendOpportunity';

import { callToast } from '@shared/components/Toaster/Toaster';

export const useRecommendOpportunity = () => {
  const [recommendOpportunity, options] = useMutation(RECOMMEND_OPPORTUNITY);
  const { t } = useTranslation();

  const handleRecommendOpportunity = async (opportunityId: string, studentUuids: string[]) => {
    try {
      await recommendOpportunity({
        variables: {
          input: {
            studentUuids,
            opportunityId,
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

  return [handleRecommendOpportunity, options] as const;
};
