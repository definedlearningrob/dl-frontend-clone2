import cx from 'classnames';
import { isEmpty } from 'lodash-es';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { EmptyLessonCard } from '@dc/shared/EmptyLessonCard';
import { LessonCard } from '@dc/shared/LessonCard';
import { TCalendarLesson, TVirtualInternshipLesson } from '@dc/resources/types';
import { useVirtualInternshipContent } from '@dc/graphql/student/hooks/useVirtualInternshipContent';
import { useVirtualInternshipLessonProgress } from '@dc/hooks/useVirtualInternshipLessonProgress';

import styles from './LessonList.module.sass';

type Props = {
  centerItems?: boolean;
  className?: string;
  emptyLessonAction?: () => void;
  indexOffset?: number;
  lessons: (TVirtualInternshipLesson | TCalendarLesson | null)[];
};

export const LessonList = ({
  centerItems = false,
  className,
  emptyLessonAction,
  indexOffset = 1,
  lessons,
}: Props) => {
  const { t } = useTranslation();
  const { opportunityId } = useParams<{ opportunityId: string }>();
  const lessonListClassName = cx(styles.lessonList, className, {
    [styles.centerItems]: centerItems,
  });
  const { data } = useVirtualInternshipContent({ opportunityId });
  const { getIsLessonEnabled } = useVirtualInternshipLessonProgress(opportunityId);

  if (isEmpty(lessons) || !data) {
    return null;
  }

  const { content } = data.opportunity.virtualInternship;

  const emptyLesson = (key: string) => (
    <EmptyLessonCard
      key={key}
      className={styles.emptyCard}
      description={t('virtualInternship.emptyLesson.description')}
      title={t('virtualInternship.emptyLesson.title')}
      {...(emptyLessonAction && { onClick: emptyLessonAction })}
    />
  );

  return (
    <div className={lessonListClassName}>
      {lessons.map((lesson, index) => {
        if (isEmpty(lesson)) return emptyLesson(`empty-lesson-${index}`);
        const currentLesson = content.find(({ id }) => id === lesson.id);
        const isEnabled = currentLesson && getIsLessonEnabled(currentLesson);
        const isSurveyPerformed =
          'careerReviewSurvey' in lesson && lesson?.careerReviewSurvey?.performed;

        return (
          <LessonCard
            key={lesson.id}
            className={styles.card}
            disabled={!isEnabled}
            imageUrl={lesson.thumbnailUrl}
            lessonType={lesson.type}
            name={lesson.name}
            navigationPath={`/opportunities/${opportunityId}/virtual-internship/lesson/${lesson.id}`}
            progress={lesson?.progress}
            step={indexOffset + index}
            surveyPerformed={isSurveyPerformed}
          />
        );
      })}
    </div>
  );
};
