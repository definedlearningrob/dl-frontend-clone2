import { times } from 'lodash-es';

import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';
import { cx } from '@shared/utils/cx';

export const OpportunityReportApplicationsCountChartSkeleton = () => (
  <div className='flex flex-col gap-xxs xxxl:gap-sm pt-sm'>
    {times(6, (barIndex) => (
      <div key={barIndex} className='flex gap-sm h-[32px] xxxl:h-[40px]'>
        <div className='basis-[310px] shrink-0 flex items-center'>
          <div className='flex flex-col ml-auto gap-xxs xxxl:gap-sm w-3/4'>
            <SkeletonRectangle />
          </div>
        </div>
        <div className='grow'>
          <div
            className={cx('h-full', {
              'w-5/6': barIndex === 1,
              'w-4/6': barIndex === 2,
              'w-3/6': barIndex === 3,
              'w-2/6': barIndex === 4,
              'w-1/6': barIndex === 5,
            })}>
            <SkeletonRectangle className='!rounded-xxs' height='full-height' />
          </div>
        </div>
      </div>
    ))}
  </div>
);
