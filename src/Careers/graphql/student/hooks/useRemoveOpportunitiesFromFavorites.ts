import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { MyOpportunitiesDocument } from '@graphql/dc/students/hooks';

import REMOVE_OPPORTUNITY_FROM_FAVORITES, {
  TRemoveOpportunityFromFavoritesData,
  TRemoveOpportunityFromFavoritesVariables,
} from '@dc/graphql/student/mutations/removeOpportunityToFavorites';
import MY_OPPORTUNITIES from '@dc/graphql/student/queries/myOpportunities';

import { callToast } from '@shared/components/Toaster/Toaster';

type FavoriteId = {
  id: string;
};

export const useRemoveOpportunityFromFavorites = () => {
  const { t } = useTranslation();
  const [mutate, { loading, error }] = useMutation<
    TRemoveOpportunityFromFavoritesData,
    TRemoveOpportunityFromFavoritesVariables
  >(REMOVE_OPPORTUNITY_FROM_FAVORITES);

  const removeOpportunityFromFavorites = async ({ id }: FavoriteId) => {
    await mutate({
      variables: {
        input: { id },
      },
      refetchQueries: [
        { query: MY_OPPORTUNITIES },
        { query: MyOpportunitiesDocument, variables: { page: 1, perPage: 100 } },
      ],
    });
    callToast('info', t('opportunities.removedFromFavorites'));
  };

  return [removeOpportunityFromFavorites, { loading, error }] as const;
};
