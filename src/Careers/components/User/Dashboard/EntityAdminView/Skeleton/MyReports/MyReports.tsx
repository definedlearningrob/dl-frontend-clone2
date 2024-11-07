import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

function EntityAdminViewMyReportsSkeleton() {
  return (
    <div className='skeleton-dashboard-entity__reports'>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className='skeleton-dashboard-entity__reports-item'>
          <SkeletonRectangle className='skeleton-dashboard-entity__reports-icon' />
          <div className='skeleton-dashboard-entity__reports-right'>
            <SkeletonRectangle size='md' />
            <SkeletonRectangle size='sm' />
          </div>
        </div>
      ))}
    </div>
  );
}

export default EntityAdminViewMyReportsSkeleton;
