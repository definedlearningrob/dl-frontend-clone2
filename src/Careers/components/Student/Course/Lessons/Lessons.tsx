import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { LessonCard } from '@dc/shared/LessonCard';
import { TCourseLesson } from '@dc/graphql/student/queries/course';
import { TPublicCourseLesson } from '@dc/graphql/public/queries/course';

import useQueryParams from '@shared/hooks/useQueryParams';

type Props = {
  courseProgress?: { submitted: number; total: number };
  lessons: TCourseLesson[] | TPublicCourseLesson[];
};

export const StudentCourseLessons = ({ courseProgress, lessons }: Props) => {
  const { t } = useTranslation();
  const sortedLessons = lessons.slice().sort((a, b) => a.step - b.step);
  const { id: courseId, shareId } = useParams<{ id: string; shareId: string }>();
  const {
    params: { code },
  } = useQueryParams<{ code: string }>();

  return (
    <section className='course-lessons'>
      <h3>{t('course.lessons.heading')}</h3>
      <div className='course-lessons__lessons'>
        {sortedLessons.map((lesson, index) => {
          const isSurveyPerformed =
            lesson.careerReviewSurvey !== null &&
            'performed' in lesson.careerReviewSurvey &&
            lesson.careerReviewSurvey.performed;
          const isProgress = 'progress' in lesson;

          if (courseProgress) {
            return (
              <LessonCard
                key={lesson.id}
                imageUrl={lesson.thumbnailUrl || lesson.imageUrl}
                lessonType={lesson.type}
                name={lesson.name}
                navigationPath={`/courses/${courseId}/lessons/${lesson.id}`}
                progress={isProgress ? lesson.progress : undefined}
                step={index + 1}
                surveyPerformed={isSurveyPerformed}
              />
            );
          }

          if (lesson.type === 'career_review_survey') {
            return null;
          }

          return (
            <LessonCard
              key={lesson.id}
              imageUrl={lesson.thumbnailUrl || lesson.imageUrl}
              lessonType={lesson.type}
              name={lesson.name}
              navigationPath={`/shared/student/courses/${shareId}/lessons/${lesson.id}?code=${code}`}
              showProgress={false}
              step={index + 1}
              surveyPerformed={false}
            />
          );
        })}
      </div>
    </section>
  );
};
