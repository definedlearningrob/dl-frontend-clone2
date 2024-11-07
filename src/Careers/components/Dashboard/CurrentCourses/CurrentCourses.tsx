import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import AddCourseCard from '@dc/components/Dashboard/AddCourseCard/AddCourseCard';
import CourseCard from '@dc/components/Dashboard/CourseCard/CourseCard';
import currentCoursesQuery, {
  TCurrentCoursesData,
} from '@dc/graphql/student/queries/currentCourses';
import DashboardCard from '@dc/components/layout/Dashboard/Card/Card';
import { NoCoursesPlaceholder } from '@dc/components/Dashboard/NoCoursesPlaceholder';
import StudentViewCoursesSkeleton from '@dc/components/Student/Dashboard/Skeleton/Courses/Courses';
import useUserInfo from '@dc/hooks/useUserInfo';
import { TStudentInfo } from '@dc/graphql/student/queries/userInfo';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import { WelcomeMessage } from '@shared/components/WelcomeMessage';
import { useResizeWidthObserver } from '@shared/hooks/useResizeWidthObserver';

import styles from './CurrentCourses.module.sass';

type Props = {
  className?: string;
};

const GAP_OFFSET = 8;

export const CurrentCourses = ({ className }: Props) => {
  const { t } = useTranslation();

  const contentWrapperRef = useRef(null);
  const nameRef = useRef(null);
  const {
    userInfo: { welcomeMessage },
  } = useUserInfo<TStudentInfo>();

  const nameWidth = useResizeWidthObserver(nameRef);
  const welcomeMessageWidth = useResizeWidthObserver(contentWrapperRef);

  return (
    <DashboardCard className={className}>
      <div>
        <header className='flex items-center gap-xs'>
          <h2 ref={nameRef} className='text-base !mb-0'>
            {t('dashboard.currentCourses.heading')}
          </h2>
          {welcomeMessage && (
            <WelcomeMessage
              leftOffset={-nameWidth - GAP_OFFSET}
              welcomeMessage={welcomeMessage}
              width={welcomeMessageWidth}
            />
          )}
        </header>
        <p className='text-font-secondary text-base mt-xs'>
          {t('dashboard.currentCourses.subHeading')}
        </p>
      </div>
      <div ref={contentWrapperRef} className={styles.coursesWrapper}>
        <SharedDataLoader<TCurrentCoursesData>
          SpinnerComponent={<StudentViewCoursesSkeleton />}
          query={currentCoursesQuery}>
          {({ currentCourses }) =>
            currentCourses.length ? (
              <>
                {currentCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    image={course.thumbnailUrl}
                    lessonsCompleted={course.progress.submitted}
                    lessonsNumber={course.progress.total}
                    title={course.name}
                    withInterActions={true}
                  />
                ))}
                <AddCourseCard />
              </>
            ) : (
              <NoCoursesPlaceholder />
            )
          }
        </SharedDataLoader>
      </div>
    </DashboardCard>
  );
};
