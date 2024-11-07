import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

export const PlansHeaderSkeleton = () => (
  <div className='flex gap-sm items-center bg-white rounded-sm py-sm px-base xxxl:py-base xxxl:px-md'>
    <SkeletonRectangle className='!w-[44px] !h-[44px] rounded-full' />
    <div className='flex flex-col gap-xxs flex-1'>
      <SkeletonRectangle height='extra-small' size='sm' />
      <SkeletonRectangle size='sm' />
    </div>
  </div>
);
