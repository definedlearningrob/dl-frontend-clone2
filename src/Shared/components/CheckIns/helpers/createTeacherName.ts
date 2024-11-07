import { TCheckInTeamSubmission } from '@pbl/components/Project/types';

import { TCheckInQuestionAnswer } from '../types';

export const createTeacherName = (answer: TCheckInQuestionAnswer | TCheckInTeamSubmission | null) =>
  answer
    ? `${answer.grade.lastGradedBy.firstName} ${answer.grade.lastGradedBy.lastName}`
    : 'Teacher';
