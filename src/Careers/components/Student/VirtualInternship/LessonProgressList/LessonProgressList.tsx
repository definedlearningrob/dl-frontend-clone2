import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ProgressIndexItem } from '@dc/components/Student/VirtualInternship';
import { useVirtualInternshipContent } from '@dc/graphql/student/hooks/useVirtualInternshipContent';
import { useVirtualInternshipLessonProgress } from '@dc/hooks/useVirtualInternshipLessonProgress';

import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

import styles from './LessonProgressList.module.sass';

export const LessonProgressList = () => {
  const { lessonId, opportunityId } = useParams<{ lessonId?: string; opportunityId: string }>();
  const [expandedLessonId, setExpandedLessonId] = useState(lessonId);
  const { data, loading } = useVirtualInternshipContent({ opportunityId });
  const { getIsLessonEnabled, virtualInternshipContent } =
    useVirtualInternshipLessonProgress(opportunityId);

  useEffect(() => {
    setExpandedLessonId(lessonId);
  }, [lessonId]);

  if (loading || !data) {
    return <SharedLoadingSpinner size='small' />;
  }

  const { postExperienceLessons } = data.opportunity.virtualInternship;

  const careerReviewSurveyLesson = postExperienceLessons.find(
    (lesson) => !!lesson.careerReviewSurvey
  );
  const isSurveyPerformed = careerReviewSurveyLesson?.careerReviewSurvey.performed ?? false;

  return (
    <div className={styles.container} data-testid='lesson-progress-list'>
      {virtualInternshipContent.map((lesson, index) => {
        const isEnabled = getIsLessonEnabled(lesson);

        return (
          <ProgressIndexItem
            key={`${lesson?.id}_${index}`}
            expandLesson={setExpandedLessonId}
            isDisabled={!isEnabled}
            isExpanded={expandedLessonId === lesson?.id}
            lesson={lesson}
            lessonNumber={index + 1}
            surveyPerformed={isSurveyPerformed}
          />
        );
      })}
    </div>
  );
};
