import { TCheckInTeamSubmission } from '@pbl/components/Project/types';

import { SUBMISSION_GRADE_STATUS } from '@shared/resources/enums';

export type TCheckInQuestionAnswer = {
  answer: string;
  grade: TCheckInQuestionGrade;
  id: string;
  updatedAt: string;
};

export type TCheckInQuestionOwner = {
  uuid: string;
};

export type TCheckInQuestion = {
  answer: TCheckInQuestionAnswer | null;
  id: string;
  gradingNeededCount?: number;
  question: string;
  step: number;
  owner: TCheckInQuestionOwner;
  teamSubmission: TCheckInTeamSubmission | null;
  __typename: 'CheckInQuestion';
};

export type TCheckInQuestionGrade = {
  createdAt: string;
  lastGradedBy: {
    firstName: string;
    lastName: string;
  };
  status: SUBMISSION_GRADE_STATUS;
  updatedAt: string;
};

export type TCheckInGroup = {
  displayName: string;
  id: string;
  name?: string;
  questions: TCheckInQuestion[];
  step: number;
  __typename: 'CheckInGroup';
};

export type TValues = {
  answer: string;
};
