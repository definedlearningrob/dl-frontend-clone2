import { gql } from '@apollo/client';

export default gql`
  mutation AddOpportunityToFavorites($input: AddOpportunityToFavoritesMutationInput!) {
    addOpportunityToFavorites(input: $input) {
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

export type TAddOpportunityToFavoritesData = {
  addOpportunityToFavorites: TFavoritesOpportunity;
};

export type TAddOpportunityToFavoritesVariables = {
  input: {
    id: string;
  };
};
