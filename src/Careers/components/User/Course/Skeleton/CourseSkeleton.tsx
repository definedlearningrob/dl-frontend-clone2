import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

import './CourseSkeleton.sass';

type Props = {
  teacherView: boolean;
};

function UserCourseSkeleton({ teacherView }: Props) {
  return (
    <section className='course'>
      <SkeletonHeader teacherView={teacherView} />
      <SkeletonLessons />
    </section>
  );
}

const SkeletonLessons = () => (
  <section className='course-lessons'>
    <SkeletonRectangle className='course-skeleton__heading' color='darker' />
    <div className='course-lessons__lessons'>
      {[...Array.from({ length: 20 })].map((_, index) => (
        <SkeletonLessonCard key={index} />
      ))}
    </div>
  </section>
);

const SkeletonLessonCard = () => (
  <div className='lesson-card -start'>
    <div className='lesson-card__image-wrapper'>
      <SkeletonRectangle className='course-skeleton__image' color='darker' />
    </div>
    <div className='lesson-card__content-wrapper'>
      <div className='lesson-card__header'>
        <SkeletonRectangle className='lesson-card__title' size='md' />
        <SkeletonRectangle className='course-skeleton__show-btn' size='sm' />
      </div>
    </div>
  </div>
);

const SkeletonHeader = ({ teacherView }: Props) => (
  <section className='course-header'>
    <div className='course-header__categories-bar'>
      <SkeletonRectangle className='course-skeleton__badge' color='darker' size='sm' />
    </div>
    <SkeletonRectangle className='course-skeleton__title' color='darker' size='sm' />
    <div className='course-skeleton__description-wrapper'>
      <SkeletonRectangle className='course-skeleton__description' color='darker' size='sm' />
      <SkeletonRectangle className='course-skeleton__description' color='darker' size='sm' />
    </div>

    <div className='my-base flex gap-base'>
      {teacherView && (
        <SkeletonRectangle className='course-skeleton__button' color='darker' size='sm' />
      )}
      <SkeletonRectangle className='!w-[180px]' color='darker' height='big' radius='sm' size='sm' />
      <SkeletonRectangle className='!w-[120px]' color='darker' height='big' radius='sm' size='sm' />
    </div>
  </section>
);

export default UserCourseSkeleton;
