import { random } from 'lodash-es';

import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

const skeletonRows = new Array(10).fill(null);

export const OpportunitiesSkeleton = () => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const skeletonHeight = isFullHD ? 'small' : 'extra-small';

  return (
    <div className='flex flex-col gap-lg xxxl:gap-xl mt-base'>
      <div className='-m-md'>
        {skeletonRows.map((_, index) => {
          const randomizedSizeIndex = random(0, 2);
          const sizeVariants = ['sm', 'md', 'lg'] as const;
          const size = sizeVariants[randomizedSizeIndex];

          return (
            <div
              key={index}
              className='flex gap-base py-sm border-b border-neutral-300 last:border-0 px-md'>
              <div className='grow basis-1/3'>
                <SkeletonRectangle height={skeletonHeight} radius='sm' size={size} />
              </div>
              <div className='grow'>
                <SkeletonRectangle height={skeletonHeight} radius='sm' size='full-width' />
              </div>
              <div className='grow-[2]'>
                <SkeletonRectangle height={skeletonHeight} radius='sm' size='full-width' />
              </div>
              <div className='grow'>
                <SkeletonRectangle height={skeletonHeight} radius='sm' size='full-width' />
              </div>
              <div className='grow'>
                <SkeletonRectangle height={skeletonHeight} radius='sm' size='full-width' />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
