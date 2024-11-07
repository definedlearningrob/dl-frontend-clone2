import { isEmpty } from 'lodash-es';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import { FavoritesCarousel, FavoritesList, EmptyFavorites } from '@dc/components/PostSecondary/';
import { useMyInstitutions } from '@dc/graphql/student/hooks/useMyInstitutions';
import { FavoritesCarouselSkeleton } from '@dc/components/PostSecondary/Favorites/FavoritesCarouselSkeleton';
import { FavoritesListSkeleton } from '@dc/components/PostSecondary/Favorites/FavoritesListSkeleton';
import useUserInfo from '@dc/hooks/useUserInfo';
import { TStudentInfo } from '@dc/graphql/student/queries/userInfo';

import styles from './Favorites.module.sass';

type Props = {
  isCarousel: boolean;
};

export const Favorites = ({ isCarousel }: Props) => {
  const { t } = useTranslation();

  const { data, loading } = useMyInstitutions();
  const { userInfo } = useUserInfo<TStudentInfo>();

  const FavouritesComponent = isCarousel ? FavoritesCarousel : FavoritesList;
  const FavouritesSkeletonComponent = isCarousel
    ? FavoritesCarouselSkeleton
    : FavoritesListSkeleton;

  const favouritesWrapperClassname = cx(styles.favoritesWrapper, {
    [styles.verticalList]: !isCarousel,
  });

  const carouselSkeletonCount = 3;
  const listSkeletonCount = 8;

  if (loading) {
    return (
      <>
        <h5 className={styles.heading}>{t('student.postSecondary.favoritesSection.heading')}</h5>
        <div className={favouritesWrapperClassname}>
          <FavouritesSkeletonComponent
            count={isCarousel ? carouselSkeletonCount : listSkeletonCount}
          />
        </div>
      </>
    );
  }

  if (!data || isEmpty(data.myInstitutions.nodes)) {
    return <EmptyFavorites />;
  }

  return (
    <>
      <h5 className={styles.heading}>{t('student.postSecondary.favoritesSection.heading')}</h5>
      <div className={favouritesWrapperClassname}>
        <FavouritesComponent
          favourites={data.myInstitutions.nodes}
          postSecondaryApplicationsEnabled={userInfo.postSecondaryApplicationsEnabled}
        />
      </div>
    </>
  );
};
