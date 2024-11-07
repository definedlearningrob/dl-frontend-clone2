import { isEmpty } from 'lodash-es';

type CourseContent = {
  items: { type: string; completed: boolean }[];
  checkIns: { completed: boolean }[];
}[];

export const getIsSurveyEnabled = (content: CourseContent) => {
  const lessonAssignments = content
    .flatMap(({ items }) => items)
    .filter((lessonItem) => lessonItem.type === 'Assignment');

  const hasAllCheckInsCompleted = content
    .flatMap(({ checkIns }) => checkIns)
    .every((checkIn) => checkIn.completed);

  if (isEmpty(lessonAssignments)) {
    return hasAllCheckInsCompleted;
  }

  return hasAllCheckInsCompleted && lessonAssignments.some((assignment) => assignment.completed);
};
