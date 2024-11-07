import { times } from 'lodash-es';

import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

export const ComponentResultChartsSkeleton = () => (
  <div className='grid grid-cols-2 gap-lg p-base border border-neutral-300 rounded-sm'>
    <div className='col-span-2 flex flex-col items-center'>
      <SkeletonRectangle className='mb-xs' radius='sm' size='sm' />
      <SkeletonRectangle className='mb-sm xxxl:mb-base' radius='sm' size='lg' />
      <div className='flex h-[271px] xxxl:h-[475px] w-full mb-sm xxxl:mb-base'>
        <div className='w-[108px] xxxl:w-[148px] flex flex-col justify-around pr-sm xxxl:pr-base'>
          {times(5, (index) => (
            <SkeletonRectangle key={index} />
          ))}
        </div>
        <div className='flex flex-1 flex-col gap-xs xxxl:gap-sm'>
          {times(5, (index) => (
            <SkeletonRectangle key={index} className='!h-full' radius='none' />
          ))}
        </div>
      </div>
      <div className='flex gap-sm self-start pl-[108px] xxxl:pl-[148px]'>
        {times(5, (index) => (
          <SkeletonRectangle key={index} className='!h-[26px] !w-[92px]' radius='xs' />
        ))}
      </div>
    </div>
    {times(2, (chartIndex) => (
      <div key={chartIndex} className='flex flex-col items-center'>
        <SkeletonRectangle className='mb-xs' radius='sm' size='sm' />
        <SkeletonRectangle className='mb-sm xxxl:mb-base' radius='sm' size='lg' />
        <div className='h-[194px] pb-[30px] pl-[40px] flex gap-xs w-full'>
          {times(6, (barIndex) => (
            <SkeletonRectangle
              key={`${chartIndex}-${barIndex}`}
              className='flex-1 !rounded-xxs'
              height='full-height'
            />
          ))}
        </div>
      </div>
    ))}
  </div>
);
