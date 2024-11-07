import DashboardCard from '@dc/layout/Dashboard/Card/Card';

import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

function EntityAdminInfoSkeleton() {
  return (
    <DashboardCard
      className='entity-admin-dashboard-info transparent-scrollbar skeleton-dashboard-entity__info'
      white={true}>
      <SkeletonRectangle />
      <SkeletonRectangle size='sm' />
      <SkeletonRectangle size='sm' />
      <SkeletonRectangle size='sm' />
      <SkeletonRectangle size='md' />
      <SkeletonRectangle size='md' />
      <SkeletonRectangle size='md' />
      <SkeletonRectangle size='md' />
      <SkeletonRectangle size='sm' />
      <SkeletonRectangle size='sm' />
      <SkeletonRectangle size='sm' />
    </DashboardCard>
  );
}

export default EntityAdminInfoSkeleton;
