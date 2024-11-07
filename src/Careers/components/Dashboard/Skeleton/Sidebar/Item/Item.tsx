import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

function SkeletonSidebarItem() {
  return (
    <div className='skeleton-sidebar__item'>
      <SkeletonRectangle radius='none' />
    </div>
  );
}

export default SkeletonSidebarItem;
