import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

function UserSchoolClassHeaderSkeleton() {
  return (
    <header className='user-class__header'>
      <div className='user-class__header__top'>
        <h2 className='user-class__header__class-info'>
          <SkeletonRectangle
            className='user-class__header__entity-name user-class-skeleton__entity-name'
            color='darker'
          />
          <SkeletonRectangle className='user-class__header__class-name' color='darker' />
        </h2>
        <SkeletonRectangle className='user-class-skeleton__announcement' color='darker' size='sm' />
        <SkeletonRectangle className='user-class-skeleton__more' color='darker' size='sm' />
      </div>
      <div className='user-class__header__bottom'>
        <SkeletonRectangle
          className='user-class__header__label user-class-skeleton__students-label'
          color='darker'
        />
        <SkeletonRectangle className='user-class-skeleton__search' color='darker' />
      </div>
    </header>
  );
}

export default UserSchoolClassHeaderSkeleton;
