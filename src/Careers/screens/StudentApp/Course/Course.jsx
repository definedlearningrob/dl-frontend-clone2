import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { StudentCourse } from '@dc/components/Student/Course/StudentCourse';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import UserCourseSkeleton from '@dc/components/User/Course/Skeleton/CourseSkeleton';
import { useCurrentCoursesQuery } from '@dc/graphql/student/hooks/useCurrentCoursesQuery';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';

import styles from './Course.module.sass';

function StudentAppCourse() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { setBackNavButton } = useNavigation();
  const { data, loading, error } = useCurrentCoursesQuery();

  useEffect(() => {
    setBackNavButton(true);

    return () => {
      setBackNavButton(false, null);
    };
  }, []);

  const isEnrolledInCourse = useMemo(
    () => data?.currentCourses.some((currentCourse) => currentCourse.id === id),
    [data]
  );

  if (loading) {
    return (
      <SharedMainContent>
        <UserCourseSkeleton teacherView={false} />
      </SharedMainContent>
    );
  }

  if (error || !data) {
    return (
      <SharedMainContent>
        <span className={styles.error} data-testid='loader-error'>
          {t('shared.dataLoader.error')}
        </span>
      </SharedMainContent>
    );
  }

  return (
    <SharedMainContent>
      <section>
        <StudentCourse isEnrolled={isEnrolledInCourse} />
      </section>
    </SharedMainContent>
  );
}

export default StudentAppCourse;
