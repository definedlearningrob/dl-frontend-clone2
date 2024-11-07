/* eslint-disable react/no-danger */
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { usePrevious } from 'react-use';

import Lesson from '@dc/components/Student/Lesson/Lesson';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import lessonInCourseQuery from '@dc/graphql/student/queries/lessonInCourse';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import DataSuspense from '@shared/components/DataSuspense/DataSuspense';

function StudentAppLesson() {
  const { lessonId, courseId } = useParams();
  const { setBackNavButton } = useNavigation();
  const history = useHistory();
  const { data, loading, error } = useQuery(lessonInCourseQuery, {
    fetchPolicy: 'network-only',
    variables: {
      courseId,
      lessonId,
      track: true,
    },
  });
  const previousProgress = usePrevious(data?.course.progress);
  const hasReviewSurvey = !!data?.course.reviewSurvey;

  useEffect(() => {
    setBackNavButton(true, `/courses/${courseId}/`);

    return () => {
      setBackNavButton(false, null);
    };
  }, []);

  // Navigate to the completed course screen when progress has changed to 100%
  useEffect(() => {
    if (
      !previousProgress ||
      !data ||
      hasReviewSurvey ||
      previousProgress.submitted === previousProgress.total
    ) {
      return;
    }

    const currentProgress = data.course.progress;
    if (currentProgress.submitted === currentProgress.total) {
      history.push({
        pathname: `/courses/${courseId}/complete`,
        state: { courseName: data.course.name },
      });
    }
  }, [previousProgress]);

  return (
    <SharedMainContent>
      <DataSuspense error={error} loading={loading}>
        <Lesson course={data?.course} />
      </DataSuspense>
    </SharedMainContent>
  );
}

export default StudentAppLesson;
