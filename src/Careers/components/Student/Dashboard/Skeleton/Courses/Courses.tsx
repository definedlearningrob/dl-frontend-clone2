import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

import styles from './Courses.module.sass';

const StudentViewCoursesSkeleton = () => (
  <div className={styles.container}>
    <SkeletonRectangle className={styles.card} color='darker' height='full-height' />
    <SkeletonRectangle className={styles.card} color='darker' height='full-height' />
    <SkeletonRectangle className={styles.card} color='darker' height='full-height' />
  </div>
);

export default StudentViewCoursesSkeleton;
