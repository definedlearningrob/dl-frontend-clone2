import { times } from 'lodash-es';

import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

export const OpportunityReportTypesChartSkeleton = () => (
  <div className='grid grid-cols-2 gap-lg p-base xxxl:p-md border border-neutral-300 rounded-sm'>
    <div className='col-span-2 flex flex-col items-center'>
      <div className='w-full flex flex-col items-center mb-[45px] xxxl:mb-[60px]'>
        <SkeletonRectangle className='mb-xs' radius='sm' size='sm' />
        <SkeletonRectangle className='mb-sm xxxl:mb-base' radius='sm' size='md' />
      </div>
      <div className='flex  w-full mb-sm xxxl:mb-base'>
        <div className='w-[156px] xxxl:w-[171px] flex flex-col gap-[13px] xxxl:gap-[23px] pr-xs'>
          {times(12, (index) => (
            <div key={index} className='h-[26px] xxxl:h-[42px] flex items-center'>
              <SkeletonRectangle height='tiny' />
            </div>
          ))}
        </div>
        <div className='flex flex-1 flex-col gap-[13px] xxxl:gap-[20px] '>
          {times(12, (index) => (
            <div key={index} className='h-[26px] xxxl:h-[34px]'>
              <SkeletonRectangle height='full-height' radius='none' />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
