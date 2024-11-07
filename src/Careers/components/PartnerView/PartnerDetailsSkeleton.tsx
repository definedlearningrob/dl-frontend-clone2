import { times } from 'lodash-es';

import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

export const PartnerDetailsSkeleton = () => (
  <div className='flex flex-col gap-base xxxl:gap-md'>
    {times(3, (i) => (
      <div key={i} className='flex flex-col gap-sm xxxl:gap-base'>
        <div className='w-[300px]'>
          <SkeletonRectangle height='extra-small' size='full-width' />
        </div>
        <div className='h-[200px]'>
          <SkeletonRectangle height='full-height' radius='xs' size='full-width' />
        </div>
      </div>
    ))}
  </div>
);
