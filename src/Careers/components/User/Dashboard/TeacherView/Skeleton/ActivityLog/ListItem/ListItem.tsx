import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

function SkeletonTeacherActivityLogItem() {
  return (
    <div className='skeleton-dashboard-teacher__activity-item'>
      <div>
        <SkeletonRectangle className='skeleton-dashboard-teacher__activity-item-icon' />
      </div>
      <div className='skeleton-dashboard-teacher__activity-item-text'>
        <SkeletonRectangle />
        <SkeletonRectangle size='lg' />
      </div>
      <div className='skeleton-dashboard-teacher__activity-item-date'>
        <SkeletonRectangle className='skeleton-dashboard-teacher__activity-item-date-rectangle' />
      </div>
    </div>
  );
}

export default SkeletonTeacherActivityLogItem;
