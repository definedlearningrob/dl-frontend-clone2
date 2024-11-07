import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { LessonCard } from '@dc/shared/LessonCard';
import { TCourseLesson } from '@dc/graphql/user/queries/course';

type Props = {
  lessons: TCourseLesson[];
};

export function UserCourseLessons({ lessons }: Props) {
  const { t } = useTranslation();
  const history = useHistory();
  const isAdminApp = history.location.pathname.includes('admin');

  return (
    <section className='course-lessons'>
      <h3 className='course-lessons__heading'>{t('course.lessons.heading')}</h3>
      <div className='course-lessons__lessons'>
        {lessons
          .slice()
          .sort((a, b) => a.step - b.step)
          .map((lesson, index) => {
            const navigationPath = `${isAdminApp ? '/admin' : ''}/lessons/${lesson.id}`;

            return (
              <LessonCard
                key={lesson.id}
                imageUrl={lesson.thumbnailUrl || lesson.imageUrl}
                lessonType={lesson.type}
                name={lesson.name}
                navigationPath={navigationPath}
                showProgress={false}
                step={index + 1}
                surveyPerformed={false}
              />
            );
          })}
      </div>
    </section>
  );
}
