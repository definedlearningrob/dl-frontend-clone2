import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

import styles from './FormListSkeleton.module.sass';

export const FormListSkeleton = () => (
  <div className={styles.wrapper}>
    <div className={styles.headSection}>
      <SkeletonRectangle className={styles.rectangle} radius='none' size='md' />
      <SkeletonRectangle className={styles.emailRectangle} radius='none' size='md' />
    </div>
    <div className={styles.bodySection}>
      <SkeletonRectangle className={styles.titleRectangle} radius='none' size='md' />
      <SkeletonRectangle className={styles.rectangle} radius='none' />
      <SkeletonRectangle className={styles.rectangle} radius='none' />
      <SkeletonRectangle className={styles.rectangle} radius='none' />
      <SkeletonRectangle className={styles.rectangle} radius='none' />
    </div>
  </div>
);
