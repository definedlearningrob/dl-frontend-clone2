import Rectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

import styles from './FavoritesListSkeleton.module.sass';

type Props = {
  count?: number;
};

export const FavoritesListSkeleton = ({ count = 4 }: Props) => (
  <div className={styles.skeletonContainer}>
    {Array.from({ length: count }, (_, index) => (
      <Rectangle
        key={index}
        className={styles.skeletonWrapper}
        color='darker'
        radius='sm'
        size='full-width'
        withoutAnimation={false}
      />
    ))}
  </div>
);
