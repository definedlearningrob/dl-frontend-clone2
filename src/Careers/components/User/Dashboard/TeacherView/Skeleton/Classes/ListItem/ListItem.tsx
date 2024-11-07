import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

SkeletonTeacherClassesItem.defaultProps = {
  labelType: false,
};

type Props = {
  labelType: boolean;
};

function SkeletonTeacherClassesItem({ labelType }: Props) {
  return (
    <div className='skeleton-dashboard-teacher__classes-item'>
      <div className='skeleton-dashboard-teacher__classes-item-left'>
        <div>
          <SkeletonRectangle />
          {!labelType && <SkeletonRectangle size='lg' />}
        </div>
        <SkeletonRectangle />
        <SkeletonRectangle />
        <SkeletonRectangle />
        <SkeletonRectangle />
      </div>
      {!labelType && (
        <div>
          <SkeletonRectangle className='skeleton-dashboard-teacher__classes-item-right' />
        </div>
      )}
    </div>
  );
}

export default SkeletonTeacherClassesItem;
