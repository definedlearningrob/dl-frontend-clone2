import { useEffect } from 'react';

import { LESSON_TYPES } from '@dc/resources/constants';
import { PresentationCard } from '@dc/components/VirtualInternship/VirtualInternshipLesson/LessonItem';
import { LessonItemGroup } from '@dc/components/VirtualInternship/VirtualInternshipLesson/LessonItemGroup';
import { LessonCheckInItems } from '@dc/components/VirtualInternship/VirtualInternshipLesson/LessonCheckInItems/LessonCheckInItems';
import { LessonTableOfContent } from '@dc/components/VirtualInternship/VirtualInternshipLesson/LessonTableOfContent/LessonTableOfContent';
import { CareerReviewSurvey } from '@dc/components/Student/Lesson/Survey/CareerReviewSurvey';

import useQueryParams from '@shared/hooks/useQueryParams';
import { cx } from '@shared/utils/cx';

import styles from './Lesson.module.sass';
import { useLessonItems } from './useLessonItems';
import { TLesson } from './types';

type Props = {
  resourceName: string;
  resourceId: string;
  lesson: TLesson;
  isPreviewOnly?: boolean;
};

export const Lesson = ({ lesson, resourceName, resourceId, isPreviewOnly }: Props) => {
  const {
    params: { section },
  } = useQueryParams<{ section?: string }>();

  const lessonItems = useLessonItems({ lesson });

  const isCareerReviewSurvey = lesson.type.toUpperCase() === LESSON_TYPES.CAREER_REVIEW_SURVEY;

  useEffect(() => {
    const lessonItem = section && document.getElementById(section);

    if (lessonItem) {
      const appHeaderHeight = 48;

      window.scrollTo({
        top: lessonItem.offsetTop - appHeaderHeight,
        behavior: 'smooth',
      });
    }
  }, [section]);

  // TODO: handle extension fields for Dig deeper into career lesson type

  return (
    <div>
      {!isCareerReviewSurvey && (
        <>
          <p className={styles.resourceName}>{resourceName}</p>
          <h4 className={styles.lessonName}>{lesson.name}</h4>
        </>
      )}
      {lesson.hasPresentation && (
        <div className={styles.presentationsWrapper}>
          {lessonItems.externalPresentations.map((presentation) => (
            <PresentationCard key={presentation.id} presentation={presentation} />
          ))}
        </div>
      )}
      <div className={cx({ 'grid grid-cols-[2fr_1fr] gap-base xxxl:gap-md': !isPreviewOnly })}>
        <div className={styles.lessonItems}>
          {lessonItems.lessonItemGroups.map((lessonItemGroup, index) => (
            <LessonItemGroup
              key={index}
              isPreviewOnly={isPreviewOnly}
              lessonItemGroup={lessonItemGroup}
              virtualInternshipId={resourceId}
            />
          ))}
          <LessonCheckInItems checkInItems={lessonItems.checkInItems} />
          {isCareerReviewSurvey && (
            <CareerReviewSurvey
              careerReviewSurvey={lesson.careerReviewSurvey}
              courseName={resourceName}
              previewOnly={isPreviewOnly}
              resourceId={resourceId}
            />
          )}
        </div>
        {!isPreviewOnly && (
          <div className={styles.progressWrapper}>
            <LessonTableOfContent />
          </div>
        )}
      </div>
    </div>
  );
};
