import { gql } from '@apollo/client';

export default gql`
  mutation ToggleInstitutionFavorite($input: ToggleInstitutionFavoriteMutationInput!) {
    toggleInstitutionFavorite(input: $input) {
      institution {
        id
        name
        isFavorite
      }
    }
  }
`;

type TInstitution = {
  id: string;
  name: boolean;
  isFavorite: boolean;
};

type TToggleInstitutionFavorite = {
  institution: TInstitution;
};

export type TToggleInstitutionFavoriteData = {
  toggleInstitutionFavorite: TToggleInstitutionFavorite;
};

export type TToggleInstitutionFavoriteVariable = {
  input: {
    institutionId: string;
  };
};
