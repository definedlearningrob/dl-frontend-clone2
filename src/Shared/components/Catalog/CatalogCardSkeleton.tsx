import { times } from 'lodash-es';

import SharedCard from '@shared/components/Card/Card';
import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

export const CatalogCardSkeleton = () => (
  <SharedCard className='flex gap-base xxxl:gap-md'>
    <SkeletonRectangle
      className='!h-[180px] xxxl:!h-[240px] !w-[320px] xxxl:w-[420px]'
      radius='sm'
    />
    <div className='flex-1 flex flex-col gap-sm xxxl:gap-base'>
      <SkeletonRectangle height='extra-small' size='md' />
      <div className='flex flex-col gap-xs'>
        {times(3, (index) => (
          <SkeletonRectangle key={index} size='full-width' />
        ))}
        <SkeletonRectangle size='sm' />
      </div>
    </div>
  </SharedCard>
);
