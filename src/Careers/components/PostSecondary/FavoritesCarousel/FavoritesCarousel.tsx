import { InstitutionCard } from '@dc/shared/InstitutionCard';
import { TMyInstitution } from '@dc/graphql/student/queries/myInstitutions';

import Carousel from '@shared/components/Carousel/Carousel';

import styles from './FavoritesCarousel.module.sass';

type Props = {
  favourites: TMyInstitution[];
  postSecondaryApplicationsEnabled: boolean;
};

export const FavoritesCarousel = ({ favourites }: Props) => {
  const carouselItems = favourites.map((item) => (
    <div key={item.id} className={styles.carouselItem}>
      <InstitutionCard institution={item} />
    </div>
  ));

  return (
    <div className={styles.carouselWrapper}>
      <Carousel data={carouselItems} />
    </div>
  );
};
