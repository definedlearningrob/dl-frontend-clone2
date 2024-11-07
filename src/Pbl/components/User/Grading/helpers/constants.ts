import { GRADING_STATUS } from '@pbl/resources/enums';

export const OTHER_STUDENTS = 'OTHER_STUDENTS';

export const subcategories = [
  GRADING_STATUS.WAITING_FOR_GRADING,
  GRADING_STATUS.ALREADY_GRADED,
  GRADING_STATUS.NOT_YET_SUBMITTED,
] as const;
