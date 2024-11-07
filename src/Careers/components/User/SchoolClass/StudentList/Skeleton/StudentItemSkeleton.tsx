import Card from '@dc/components/layout/Dashboard/Card/Card';

import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

const UserSchoolClassListStudent = () => (
  <Card className='user-class__student' white={true}>
    <div className='user-class__student__header'>
      <div className='user-class__student__avatar-wrapper'>
        <SkeletonRectangle className='user-class-skeleton__avatar' />
      </div>
    </div>
    <SkeletonRectangle className='user-class-skeleton__list-name' size='lg' />
    <SkeletonRectangle className='user-class__student__assessment' />
    <SkeletonRectangle className='user-class__student__course-progress' />
    <SkeletonRectangle className='user-class-skeleton__list-button' size='md' />
  </Card>
);

export default UserSchoolClassListStudent;
