import cx from 'classnames';

import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

type Props = {
  type: 'vertical' | 'horizontal';
  heading: string;
};

function DashboardMyReportsSkeleton({ type, heading }: Props) {
  const classes = cx('skeleton-dashboard__my-reports', 'flex flex-col', {
    [`-${type}`]: type,
  });

  return (
    <div className={classes}>
      <h4 className='text-base mb-base'>{heading}</h4>
      <div className='flex flex-col gap-y-sm flex-1'>
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className='flex flex-1 items-center justify-center p-x rounded-sm border border-neutral-300'>
            <SkeletonRectangle className='skeleton-dashboard__my-reports-icon' />
            <div className='skeleton-dashboard__my-reports-right ml-sm flex-1'>
              <SkeletonRectangle className='mb-x leading-lg' size='lg' />
              <SkeletonRectangle className='leading-lg' size='sm' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardMyReportsSkeleton;
