import { times } from 'lodash-es';

import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

export const GuestPortfolioLoader = () => (
  <div className='flex pt-sm xxxl:pt-base gap-base xxxl:gap-md justify-center'>
    <div className='w-[320px] xxxl:w-[380px]'>
      <SkeletonRectangle height='card' radius='sm' size='full-width' />
    </div>
    <div className='w-[640px] xxxl:w-[720px] flex flex-col gap-base xxxl:gap-md'>
      {times(4, (index) => (
        <SkeletonRectangle key={index} height='card' radius='sm' size='full-width' />
      ))}
    </div>
  </div>
);
