import { useTranslation } from 'react-i18next';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';
import { ReactComponent as TagIcon } from '@shared/svg/tag_icon.svg';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

export const PerformanceIndicatorsChartSkeleton = () => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const yAxisTickClasses =
    'relative w-full text-center after:absolute after:top-1/2 after:-right-x after:h-[1px] after:w-xs after:bg-neutral-300';

  return (
    <div className='flex flex-col gap-xs xxxl:gap-sm bg-white p-sm xxxl:p-base rounded-sm'>
      <div className='flex justify-between mb-xxs'>
        <div className='flex items-center gap-xs'>
          <IconContainer Icon={TagIcon} paddingSize='none' />
          <SkeletonRectangle
            className='!w-[160px]'
            height={isFullHD ? 'extra-small' : 'tiny'}
            radius='sm'
          />
        </div>
        <div className='flex items-center gap-xs font-medium text-xxs xxxl:text-xs text-font-secondary'>
          {t('studentGoalReport.averageScore')}
          <SkeletonRectangle className='!w-base' height='extra-small' radius='sm' />
        </div>
      </div>
      <div className='flex gap-xs h-[155px]'>
        <div className='flex gap-xxs'>
          <div className='flex flex-col justify-between items-center text-xxs text-font-secondary font-medium leading-lg'>
            <span className={yAxisTickClasses}>4</span>
            <span className={yAxisTickClasses}>3</span>
            <span className={yAxisTickClasses}>2</span>
            <span className={yAxisTickClasses}>1</span>
            <span className={yAxisTickClasses}>0</span>
          </div>
          <div className='w-[1px] ml-xxs bg-neutral-300' />
        </div>
        <div className='flex items-end gap-xs flex-1 border border-neutral-200 rounded-sm mb-xs px-xs pt-xs'>
          <SkeletonRectangle className='!rounded-xxs !h-[56px]' />
          <SkeletonRectangle className='!rounded-xxs !h-[110px]' />
          <SkeletonRectangle className='!rounded-xxs !h-[83px]' />
          <SkeletonRectangle className='!rounded-xxs !h-[110px]' />
          <SkeletonRectangle className='!rounded-xxs !h-[83px]' />
          <SkeletonRectangle className='!rounded-xxs !h-[110px]' />
          <SkeletonRectangle className='!rounded-xxs !h-[110px]' />
          <SkeletonRectangle className='!rounded-xxs !h-[110px]' />
        </div>
      </div>
      <div className='ml-[34px] mr-xs mb-[18px] h-xs border border-neutral-300 border-b-0' />
    </div>
  );
};
