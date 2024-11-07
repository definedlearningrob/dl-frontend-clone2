import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

import styles from './CommonAppRequestsSkeleton.module.sass';

export const CommonAppRequestsSkeleton = () => (
  <div className={styles.wrapper}>
    <div className={styles.headSection}>
      <SkeletonRectangle className={styles.rectangle} radius='none' size='md' />
    </div>
    <div className={styles.bodySection}>
      <SkeletonRectangle className={styles.titleRectangle} radius='none' size='sm' />
      <SkeletonRectangle className={styles.rectangle} radius='none' />
      <SkeletonRectangle className={styles.rectangle} radius='none' />
      <SkeletonRectangle className={styles.rectangle} radius='none' />
      <SkeletonRectangle className={styles.rectangle} radius='none' />
      <SkeletonRectangle className={styles.rectangle} radius='none' />
    </div>
  </div>
);
