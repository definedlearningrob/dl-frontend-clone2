import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';
import Card from '@shared/components/Card/Card';

import styles from './Skeleton.module.sass';

export const EntityAdminInfoSkeleton = () => (
  <Card className={styles.entityInfoSkeleton}>
    <SkeletonRectangle />
    <SkeletonRectangle size='sm' />
    <SkeletonRectangle size='sm' />
    <SkeletonRectangle size='sm' />
    <SkeletonRectangle size='md' />
    <SkeletonRectangle size='md' />
    <SkeletonRectangle size='md' />
    <SkeletonRectangle size='md' />
    <SkeletonRectangle size='sm' />
    <SkeletonRectangle size='sm' />
    <SkeletonRectangle size='sm' />
  </Card>
);
