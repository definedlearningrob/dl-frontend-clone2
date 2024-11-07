import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useCourseQuery } from '@dc/graphql/student/hooks/useCourseQuery';
import UserCourseSkeleton from '@dc/components/User/Course/Skeleton/CourseSkeleton';

import { Course } from './Course';
import styles from './StudentCourse.module.sass';

type Props = {
  isEnrolled: boolean;
};

export const StudentCourse = ({ isEnrolled }: Props) => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const { data, loading, error } = useCourseQuery({
    id,
    track: true,
    fetchPolicy: 'no-cache',
  });

  if (loading) {
    return <UserCourseSkeleton teacherView={false} />;
  }

  if (error || !data) {
    return (
      <span className={styles.error} data-testid='loader-error'>
        {t('shared.dataLoader.error')}
      </span>
    );
  }

  return <Course course={data.course} isEnrolled={isEnrolled} />;
};
