import { times } from 'lodash-es';

import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

export const PartnerOpportunitiesSkeleton = () => (
  <div
    className='px-base py-sm grid grid-cols-3 gap-x-x gap-y-base xxxl:gap-x-base xxxl:gap-y-md'
    data-testid='partner-opportunities-skeleton'>
    {times(6, (index) => (
      <SkeletonRectangle key={index} className='!h-[268px] xxxl:!h-[304px]' radius='sm' />
    ))}
  </div>
);
