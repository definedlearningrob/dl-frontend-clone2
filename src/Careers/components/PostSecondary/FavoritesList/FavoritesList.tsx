import { InstitutionCard } from '@dc/shared/InstitutionCard';
import { TMyInstitution } from '@dc/graphql/student/queries/myInstitutions';

import styles from './FavoritesList.module.sass';

type Props = {
  favourites: TMyInstitution[];
  postSecondaryApplicationsEnabled: boolean;
};

export const FavoritesList = ({ favourites }: Props) => (
  <div className={styles.favouritesList}>
    {favourites.map((item) => (
      <InstitutionCard key={item.id} institution={item} />
    ))}
  </div>
);
