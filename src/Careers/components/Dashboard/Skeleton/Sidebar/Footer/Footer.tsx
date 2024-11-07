import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

function SkeletonSidebarFooter() {
  return (
    <div className='skeleton-sidebar__footer'>
      <SkeletonRectangle />
      <SkeletonRectangle />
      <SkeletonRectangle size='lg' />
    </div>
  );
}

export default SkeletonSidebarFooter;
