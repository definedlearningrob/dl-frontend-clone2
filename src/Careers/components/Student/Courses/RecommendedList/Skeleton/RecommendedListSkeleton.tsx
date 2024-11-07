//eslint-disable-next-line max-len
import DashboardRecommendedCardSkeleton from '@dc/components/Dashboard/RecommendedCourses/RecommendedCard/Skeleton/RecommendedCardSkeleton';

import styles from './RecommendedListSkeleton.module.sass';

const itemsCount = 5;

function StudentCoursesRecommendedListSkeleton() {
  return (
    <div className={styles.skeletonList}>
      {Array.from({ length: itemsCount }, (_, index) => (
        <DashboardRecommendedCardSkeleton key={index} />
      ))}
    </div>
  );
}

export default StudentCoursesRecommendedListSkeleton;
