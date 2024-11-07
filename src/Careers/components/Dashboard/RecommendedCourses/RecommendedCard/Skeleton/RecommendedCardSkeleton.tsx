import cx from 'classnames';

import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';
import styles from '@shared/components/CourseCard/CourseCard.module.sass';

function DashboardRecommendedCardSkeleton() {
  return (
    <div className={cx('recommended-card-skeleton', styles.courseCard)}>
      <div
        className={cx(
          'recommended-card-skeleton__container',
          styles.container,
          styles.defaultCard
        )}>
        <div className='flex justify-between w-full'>
          <SkeletonRectangle className='!mb-0 basis-1/4' withoutAnimation={true} />
          <SkeletonRectangle className='basis-1/3' withoutAnimation={true} />
        </div>
        <h2 className={cx('recommended-card-skeleton__header', styles.header)}>
          <SkeletonRectangle size='lg' withoutAnimation={true} />
          <SkeletonRectangle size='sm' withoutAnimation={true} />
        </h2>
        <div className={cx('recommended-card-skeleton__header', styles.button)}>
          <SkeletonRectangle size='md' withoutAnimation={true} />
        </div>
      </div>
    </div>
  );
}

export default DashboardRecommendedCardSkeleton;
