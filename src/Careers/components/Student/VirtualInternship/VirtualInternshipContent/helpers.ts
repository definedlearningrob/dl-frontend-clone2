import { groupBy } from 'lodash-es';

import { TCalendarLesson, TVirtualInternshipLesson } from '@dc/resources/types';

export const groupLessonsByCompletion = (
  lessons: (TCalendarLesson | TVirtualInternshipLesson | null)[]
) =>
  groupBy(lessons, (lesson) => {
    if (!lesson) {
      return 'unfinishedLessons';
    }

    const isCareerReviewSurvey = 'careerReviewSurvey' in lesson && !!lesson.careerReviewSurvey;
    const isCompleted = isCareerReviewSurvey
      ? lesson.careerReviewSurvey.performed
      : lesson.progress.total === lesson.progress.submitted;

    if (isCompleted) {
      return 'completedLessons';
    }

    return 'unfinishedLessons';
  });
