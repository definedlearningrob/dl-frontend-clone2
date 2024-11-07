import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

import styles from './CoursesSkeleton.module.sass';

const SKELETON_COUNT = 4;

function CoursesSkeleton() {
  return (
    <div className='user-dashboard-courses' data-testid='skeleton-courses'>
      {Array.from({ length: SKELETON_COUNT }, (_, index) => (
        <SkeletonRectangle
          key={index}
          className={styles.skeletonCard}
          color='darker'
          size='full-width'
        />
      ))}
    </div>
  );
}

export default CoursesSkeleton;
