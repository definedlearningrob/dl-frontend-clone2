import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { match } from 'ts-pattern';

import { StudentCourseLessons } from '@dc/components/Student/Course/Lessons/Lessons';
import CourseProgressBar from '@dc/components/Student/Course/StudentCourse/ProgressBar';
import UnenrollModal from '@dc/components/Student/Course/StudentCourse/UnenrollModal';
import { CONVERSATION_CONTEXT_TYPES, LESSON_TYPES } from '@dc/resources/constants';
import { TCourse } from '@dc/graphql/student/queries/course';
import { useEnrollInCourse } from '@dc/graphql/student/hooks/useEnrollInCourse';
import currentCoursesQuery from '@dc/graphql/student/queries/currentCourses';
import { getCurrentUser } from '@dc/services/session';

import SharedButton from '@shared/components/Button/Button';
import SharedLink from '@shared/components/Link/Link';
import { useMessaging } from '@shared/hooks/useMessaging';
import { ButtonVariant } from '@shared/components/Button/Button';

import { CourseBasicInfo } from '../CourseBasicInfo';

type Props = {
  course: TCourse;
  isEnrolled: boolean;
};

export const Course = ({ course, isEnrolled }: Props) => {
  const [isUnenrollModalOpen, setUnenrollModalVisibility] = useState(false);
  const { messagingState, setMessagingState } = useMessaging();
  const currentUser = getCurrentUser();
  const [enrollInCourse, { loading: enrollLoading }] = useEnrollInCourse();
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const { name, description, pathway, progress, lessons } = course;
  const { total, submitted } = progress;

  useEffect(() => {
    if (currentUser) {
      setMessagingState({
        ...messagingState,
        context: {
          id,
          type: CONVERSATION_CONTEXT_TYPES.COURSE,
          title: name,
        },
      });

      return () => {
        setMessagingState({
          ...messagingState,
          context: null,
        });
      };
    }
  }, []);

  const handleEnrollInCourse = () => {
    enrollInCourse({ courseId: id, refetchQueries: [{ query: currentCoursesQuery }] });
  };

  const continueLessonId = useMemo(() => {
    const firstUncompletedLesson = course.lessons
      .slice()
      .sort((a, b) => a.step - b.step)
      .find(
        ({ progress, careerReviewSurvey, type }) =>
          progress.total - progress.submitted !== 0 ||
          (!careerReviewSurvey?.performed &&
            type === LESSON_TYPES.CAREER_REVIEW_SURVEY.toLowerCase())
      );

    return firstUncompletedLesson?.id;
  }, []);

  const courseStatus = useMemo(() => {
    if (submitted === 0) return 'start';
    if (total - submitted === 0) return 'done';

    return 'continue';
  }, []);

  const toogleUnenrollModalOpen = () => setUnenrollModalVisibility(!isUnenrollModalOpen);

  const actionButtonVariant = () =>
    match(courseStatus)
      .returnType<ButtonVariant>()
      .with('start', () => 'primary')
      .with('continue', () => 'secondary')
      .otherwise(() => 'success');

  const buttonLabel = isEnrolled
    ? t('course.header.button.unenroll')
    : t('student.onboarding.pathway.enroll');

  return (
    <>
      <section className='mb-md'>
        <CourseBasicInfo description={description} name={name} pathway={pathway} />
        <div className='flex gap-sm mb-md'>
          <SharedLink
            className='w-[180px]'
            size='md'
            to={continueLessonId ? `/courses/${id}/lessons/${continueLessonId}` : '/courses'}
            variant={actionButtonVariant()}>
            {t(`course.header.button.${courseStatus}`)}
          </SharedLink>
          <SharedButton
            isLoading={!isEnrolled && enrollLoading}
            size='md'
            variant={isEnrolled ? 'primary' : 'primary-outlined'}
            onClick={isEnrolled ? toogleUnenrollModalOpen : handleEnrollInCourse}>
            {buttonLabel}
          </SharedButton>
        </div>
        <CourseProgressBar target={total} value={submitted} />
        {isEnrolled && isUnenrollModalOpen && (
          <UnenrollModal courseName={name} onClose={toogleUnenrollModalOpen} />
        )}
      </section>
      <StudentCourseLessons courseProgress={course.progress} lessons={lessons} />
    </>
  );
};
