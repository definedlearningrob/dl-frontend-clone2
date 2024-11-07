import SkeletonContentWrapper from './ContentWrapper/ContentWrapper';
import SkeletonSidebar from './Sidebar/Sidebar';

import './Skeleton.sass';

type UserType = 'STUDENT' | 'USER' | 'ADMIN';

type Props = {
  type: UserType;
};

function DashbaordSkeleton({ type }: Props) {
  const sidebarCount = type === 'USER' ? 3 : 5;

  return (
    <div className='skeleton-container'>
      <SkeletonSidebar itemsCount={sidebarCount} />
      <SkeletonContentWrapper />
    </div>
  );
}

export default DashbaordSkeleton;
