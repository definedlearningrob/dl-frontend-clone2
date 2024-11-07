import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { usePublicCourseQuery } from '@dc/graphql/public/hooks/usePublicCourseQuery';
import { LessonContent } from '@dc/screens/GuestApp/PublicLesson/LessonContent';

import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import useQueryParams from '@shared/hooks/useQueryParams';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

import styles from './PublicLesson.module.sass';

export const PublicLesson = () => {
  const { lessonId, shareId } = useParams<{ lessonId: string; shareId: string }>();
  const { setBackNavButton } = useNavigation();
  const {
    params: { code },
  } = useQueryParams<{ code: string }>();

  const { data, loading } = usePublicCourseQuery({
    code,
    shareId,
  });

  const foundLesson = data?.course?.lessons?.find(
    (lesson: { id: string }) => lesson.id === lessonId
  );

  useEffect(() => {
    setBackNavButton(true);

    return () => {
      setBackNavButton(false);
    };
  }, []);

  if (loading) {
    return (
      <SharedMainContent>
        <SharedLoadingSpinner size='full-screen' />
      </SharedMainContent>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <SharedMainContent className={styles.container}>
      {foundLesson ? (
        <LessonContent isPublic={true} lesson={foundLesson} />
      ) : (
        <SharedLoadingSpinner size='full-screen' />
      )}
    </SharedMainContent>
  );
};
