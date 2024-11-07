import Rectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

import styles from './FavoritesCarouselSkeleton.module.sass';

type Props = {
  count?: number;
};

export const FavoritesCarouselSkeleton = ({ count = 4 }: Props) => (
  <div className={styles.skeletonContainer}>
    {Array.from({ length: count }, (_, index) => (
      <Rectangle
        key={index}
        className={styles.skeletonWrapper}
        color='darker'
        height='full-height'
        radius='sm'
        size='full-width'
        withoutAnimation={false}
      />
    ))}
  </div>
);
