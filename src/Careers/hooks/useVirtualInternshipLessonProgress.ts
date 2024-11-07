import { useMemo } from 'react';
import { isEmpty } from 'lodash-es';

import { useVirtualInternshipContent } from '@dc/graphql/student/hooks/useVirtualInternshipContent';
import { TVirtualInternshipContent } from '@dc/graphql/student/queries/virtualInternshipContent';
import { LESSON_TYPES } from '@dc/resources/constants';
import { COMPLETABLE_ITEMS } from '@dc/components/VirtualInternship/VirtualInternshipLesson/constants';

const CALENDAR_LESSON_COUNT = 4;

export const useVirtualInternshipLessonProgress = (opportunityId: string) => {
  const { data } = useVirtualInternshipContent({ opportunityId });

  const virtualInternshipContent = useMemo(() => {
    if (!data) {
      return [];
    }

    const { content, studentExperienceOpportunityLessons, requiredExperiences } =
      data.opportunity.virtualInternship;
    const studentExperiencesCount = studentExperienceOpportunityLessons.length;

    return [
      ...content.slice(0, CALENDAR_LESSON_COUNT + studentExperiencesCount),
      ...Array<null>(Math.max(0, requiredExperiences - studentExperiencesCount)).fill(null),
      ...content.slice(CALENDAR_LESSON_COUNT + studentExperiencesCount),
    ];
  }, [data]);

  const areLessonItemsCompleted = (lesson: TVirtualInternshipContent | null) => {
    if (!lesson) {
      return false;
    }

    const allItems = [...lesson.items, ...lesson.checkIns];

    return allItems
      .filter((lessonItem) => COMPLETABLE_ITEMS.includes(lessonItem.type))
      .every((item) => item.completed);
  };

  const getUnfinishedPreviousLessons = (lessonId: string) => {
    const lessonIndex = virtualInternshipContent.findIndex((lesson) => lesson?.id === lessonId);
    const progressedLessons = virtualInternshipContent.slice(0, lessonIndex);

    return progressedLessons.filter((lesson) => !areLessonItemsCompleted(lesson));
  };

  const getIsLessonEnabled = (lesson: TVirtualInternshipContent | null) => {
    if (!lesson || !data) {
      return false;
    }
    const { postExperienceLessons, studentExperienceOpportunityLessons } =
      data.opportunity.virtualInternship;
    const careerReviewSurvey = postExperienceLessons.find(
      (lesson) => !!lesson.careerReviewSurvey
    )?.careerReviewSurvey;
    const experienceLessonIds = studentExperienceOpportunityLessons.map(({ id }) => id);

    const isFirstLesson = virtualInternshipContent[0]?.id === lesson.id;
    const isCompleted =
      lesson.type === LESSON_TYPES.CAREER_REVIEW_SURVEY
        ? careerReviewSurvey?.performed
        : areLessonItemsCompleted(lesson);
    const isExperienceLesson = experienceLessonIds.includes(lesson.id);
    const unfinishedPreviousLessons = getUnfinishedPreviousLessons(lesson.id);
    const hasUnfinishedPreviousLessons = !isEmpty(unfinishedPreviousLessons);
    const isUnlockedExperienceLesson =
      isExperienceLesson &&
      unfinishedPreviousLessons.every(
        (lesson) => lesson && experienceLessonIds.includes(lesson.id)
      );

    return (
      isFirstLesson || isCompleted || !hasUnfinishedPreviousLessons || isUnlockedExperienceLesson
    );
  };

  return {
    virtualInternshipContent,
    areLessonItemsCompleted,
    getIsLessonEnabled,
    getUnfinishedPreviousLessons,
  };
};
