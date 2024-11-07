import { gql } from '@apollo/client';

export default gql`
  mutation RemoveOpportunityFromFavorites($input: RemoveOpportunityFromFavoritesMutationInput!) {
    removeOpportunityFromFavorites(input: $input) {
      opportunity {
        id
        isFavorite
      }
    }
  }
`;

type TFavoritesOpportunity = {
  id: string;
  isFavorite: boolean;
};

export type TRemoveOpportunityFromFavoritesData = {
  removeOpportunityFromFavorites: TFavoritesOpportunity;
};

export type TRemoveOpportunityFromFavoritesVariables = {
  input: {
    id: string;
  };
};
