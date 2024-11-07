import { useMutation } from '@apollo/client';

import TOGGLE_FAVORITE_INSTITUTION, {
  TToggleInstitutionFavoriteData,
  TToggleInstitutionFavoriteVariable,
} from '@dc/graphql/student/mutations/toggleFavouriteInstitution';
import { MY_INSTITUTIONS_QUERY } from '@dc/graphql/student/queries/myInstitutions';

export type FavoriteInstitution = {
  institutionId: string;
};

export const useToggleInstitutionFavorite = () => {
  const [mutate, { loading, data }] = useMutation<
    TToggleInstitutionFavoriteData,
    TToggleInstitutionFavoriteVariable
  >(TOGGLE_FAVORITE_INSTITUTION);

  const toggleFavorite = async ({ institutionId }: FavoriteInstitution) => {
    await mutate({
      variables: {
        input: { institutionId },
      },
      refetchQueries: [{ query: MY_INSTITUTIONS_QUERY }],
    });
  };

  return [toggleFavorite, { loading, data }] as const;
};
