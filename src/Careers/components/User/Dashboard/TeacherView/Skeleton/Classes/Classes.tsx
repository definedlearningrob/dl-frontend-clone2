import SkeletonTeacherClassesItem from './ListItem/ListItem';

const itemsLength = 7;

function TeacherViewClassesSkeletonLoader() {
  return (
    <div className='skeleton-dashboard-teacher__classes'>
      <SkeletonTeacherClassesItem labelType={true} />
      {Array.from({ length: itemsLength }, (_, index) => (
        <SkeletonTeacherClassesItem key={index} />
      ))}
    </div>
  );
}

export default TeacherViewClassesSkeletonLoader;
