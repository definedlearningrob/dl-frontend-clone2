import { times } from 'lodash-es';

import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

export const PartnerDocumentationSkeleton = () => (
  <div className='flex flex-col gap-x xxxl:gap-sm'>
    {times(3, (index) => (
      <SkeletonRectangle
        key={index}
        className='!h-[78px] xxxl:!h-[83px]'
        radius='sm'
        size='full-width'
      />
    ))}
  </div>
);
