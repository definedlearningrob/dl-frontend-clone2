import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

import styles from './DescriptionSkeleton.module.sass';

export const DescriptionSkeleton = () => (
  <div className={styles.skeletonWrapper}>
    <SkeletonRectangle
      className={styles.descriptionSkeleton}
      color='darker'
      height='base'
      radius='sm'
      size='lg'
    />
    <SkeletonRectangle
      className={styles.descriptionSkeleton}
      color='darker'
      height='extra-small'
      radius='sm'
      size='md'
    />
    <SkeletonRectangle
      className={styles.descriptionSkeleton}
      color='darker'
      height='extra-small'
      radius='sm'
      size='sm'
    />
  </div>
);
