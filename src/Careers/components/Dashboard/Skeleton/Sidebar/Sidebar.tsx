import { DCLogo } from '@dc/shared/DCLogo/DCLogo';

import SkeletonSidebarFooter from './Footer/Footer';
import SkeletonSidebarItem from './Item/Item';

type Props = {
  itemsCount: number;
};

function SkeletonSidebar({ itemsCount }: Props) {
  const renderItems = () =>
    Array.from({ length: itemsCount }, (_, index) => <SkeletonSidebarItem key={index} />);

  return (
    <div className='skeleton-sidebar'>
      <DCLogo className='skeleton-sidebar__logo-icon' />
      {renderItems()}
      <div className='skeleton-sidebar__divider' />
      <SkeletonSidebarFooter />
    </div>
  );
}

export default SkeletonSidebar;
