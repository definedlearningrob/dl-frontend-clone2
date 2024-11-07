import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { MyOpportunitiesDocument } from '@graphql/dc/students/hooks';

import ADD_OPPORTUNITY_TO_FAVORITES, {
  TAddOpportunityToFavoritesData,
  TAddOpportunityToFavoritesVariables,
} from '@dc/graphql/student/mutations/addOpportunityToFavorites';
import MY_OPPORTUNITIES from '@dc/graphql/student/queries/myOpportunities';

import { callToast } from '@shared/components/Toaster/Toaster';

type FavoriteId = {
  id: string;
};

export const useAddOpportunityToFavorites = () => {
  const { t } = useTranslation();
  const [mutate, { loading, error }] = useMutation<
    TAddOpportunityToFavoritesData,
    TAddOpportunityToFavoritesVariables
  >(ADD_OPPORTUNITY_TO_FAVORITES);

  const addOpportunityToFavorites = async ({ id }: FavoriteId) => {
    await mutate({
      variables: {
        input: { id },
      },
      refetchQueries: [
        { query: MY_OPPORTUNITIES },
        { query: MyOpportunitiesDocument, variables: { page: 1, perPage: 100 } },
      ],
    });
    callToast('favorite', t('opportunities.addedToFavorites'));
  };

  return [addOpportunityToFavorites, { loading, error }] as const;
};
