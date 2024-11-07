import cx from 'classnames';

import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

const itemsCount = 6;

EntityAdminTablesSkeleton.defaultProps = {
  withoutPadding: false,
  withoutMargin: false,
};

type Props = {
  withoutHeader?: boolean;
  withoutPadding?: boolean;
  withoutMargin?: boolean;
};

function EntityAdminTablesSkeleton({ withoutHeader, withoutMargin, withoutPadding }: Props) {
  const classes = cx('skeleton-dashboard-entity__tables', {
    'entity-admin-dashboard-table': withoutHeader,
    'entity-admin-dashboard-tables': !withoutHeader,
    '-with-padding': !withoutPadding,
    '-without-margin': withoutMargin,
  });

  return (
    <div className={classes}>
      {!withoutHeader && (
        <div className='skeleton-dashboard-entity__tables-header'>
          <SkeletonRectangle className='skeleton-dashboard-entity__tables-heading' />
          <SkeletonRectangle className='skeleton-dashboard-entity__tables-search' size='sm' />
        </div>
      )}
      <div className='skeleton-dashboard-entity__tables-labels'>
        <SkeletonRectangle size='md' />
        <SkeletonRectangle size='lg' />
        <SkeletonRectangle size='lg' />
        <SkeletonRectangle size='lg' />
        <SkeletonRectangle size='lg' />
      </div>
      <div className='skeleton-dashboard-entity__tables-items'>
        {Array.from({ length: itemsCount }).map((_, i) => (
          <div key={i} className='skeleton-dashboard-entity__tables-item'>
            <SkeletonRectangle className='skeleton-dashboard-entity__tables-item-name' size='lg' />
            <SkeletonRectangle size='lg' />
            <SkeletonRectangle size='lg' />
            <SkeletonRectangle size='lg' />
            <SkeletonRectangle size='lg' />
          </div>
        ))}
      </div>
    </div>
  );
}

export default EntityAdminTablesSkeleton;
