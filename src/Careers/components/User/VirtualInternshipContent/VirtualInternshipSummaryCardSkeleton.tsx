import SharedCard from '@shared/components/Card/Card';
import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

export const VirtualInternshipSummaryCardSkeleton = () => (
  <SharedCard>
    <div className='flex items-start flex-wrap gap-base xl:flex-nowrap'>
      <SkeletonRectangle
        className='grow-0 shrink-0 !h-[150px] basis-[27%] xxxl:basis-[32%]'
        radius='sm'
      />
      <div className='flex-1'>
        <SkeletonRectangle className='mb-xs' height='small' radius='sm' size='md' />
        <SkeletonRectangle className='mb-xxs' size='lg' />
        <SkeletonRectangle className='mb-xxs' size='lg' />
      </div>
    </div>
  </SharedCard>
);
