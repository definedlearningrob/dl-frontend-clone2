import { times } from 'lodash-es';

import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

export const TrackListSkeleton = () => (
  <div className='grid grid-cols-5 gap-sm' data-testid='track-list-skeleton'>
    {times(5, (index) => (
      <SkeletonRectangle key={index} className='!h-[322px] xxxl:!h-[362px]' radius='sm' />
    ))}
  </div>
);
