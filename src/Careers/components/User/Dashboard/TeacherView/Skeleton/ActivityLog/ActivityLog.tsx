import SkeletonTeacherActivityLogItem from './ListItem/ListItem';

const itemsLength = 13;

function TeacherViewActivityLogSkeletonLoader() {
  return (
    <div className='skeleton-dashboard-teacher__activity'>
      {Array.from({ length: itemsLength }, (_, index) => (
        <SkeletonTeacherActivityLogItem key={index} />
      ))}
    </div>
  );
}

export default TeacherViewActivityLogSkeletonLoader;
