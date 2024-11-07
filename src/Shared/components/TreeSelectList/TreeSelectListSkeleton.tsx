import SkeletonRectangle from '../Skeleton/Rectangle/Rectangle';

export const TreeSelectListSkeleton = () => (
  <div className='h-[280px] py-xs'>
    <SkeletonRectangle className='my-xs' height='base' radius='sm' />
    <SkeletonRectangle className='my-xs' height='base' radius='sm' />
    <SkeletonRectangle className='my-xs' height='base' radius='sm' />
    <SkeletonRectangle className='my-xs' height='base' radius='sm' />
  </div>
);
