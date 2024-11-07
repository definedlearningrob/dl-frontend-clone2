import SharedCard from '@shared/components/Card/Card';
import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

import styles from './OpportunitySkeleton.module.sass';

export const OpportunitySkeleton = () => (
  <SharedCard className={styles.card}>
    <div className={styles.imageWrapper}>
      <SkeletonRectangle
        className={styles.image}
        color='darker'
        height='full-height'
        radius='sm'
        size='sm'
      />
    </div>
    <div className={styles.opportunityDetails}>
      <div className={styles.header}>
        <SkeletonRectangle color='darker' height='base' radius='sm' size='sm' />
        <SkeletonRectangle color='darker' height='base' radius='sm' size='sm' />
      </div>
      <h3 className={styles.heading}>
        <SkeletonRectangle color='darker' height='extra-small' radius='sm' size='full-width' />
      </h3>
      <div className={styles.labelsWrapper}>
        <SkeletonRectangle
          className={styles.metadata}
          color='darker'
          height='extra-small'
          radius='sm'
          size='lg'
        />
        <SkeletonRectangle
          className={styles.metadata}
          color='darker'
          height='extra-small'
          radius='sm'
          size='md'
        />
        <SkeletonRectangle
          className={styles.metadata}
          color='darker'
          height='extra-small'
          radius='sm'
          size='sm'
        />
      </div>
      <div>
        <SkeletonRectangle color='darker' height='base' radius='sm' size='sm' />
      </div>
    </div>
  </SharedCard>
);
