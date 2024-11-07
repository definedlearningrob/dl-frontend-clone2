import { times } from 'lodash-es';

import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

import { PlanGroupChart } from './PlanGroupChart';

type Props = {
  chartType?: 'bar' | 'pie';
};

export const PlanGroupCardSkeleton = ({ chartType = 'pie' }: Props) => (
  <div className='flex flex-col items-center bg-white p-base xxxl:p-md outline outline-neutral-300 outline-1'>
    <SkeletonRectangle
      className='!w-[180px] xxxl:!w-[256px] mb-base xxxl:mb-sm'
      height='extra-small'
      radius='sm'
    />
    <div className='w-fit mb-md xxxl:mb-base'>
      <PlanGroupChart chartType={chartType} isLoading={true} />
    </div>
    <div className='grid grid-cols-2 gap-y-xs xxxl:gap-y-x gap-x-xs xxxl:gap-x-sm px-sm xxxl:px-base w-full'>
      {times(4, (index) => (
        <SkeletonRectangle key={index} height='extra-small' radius='sm' />
      ))}
    </div>
  </div>
);
