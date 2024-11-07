import { PRODUCT_SUBMISSION_STATUS } from '@pbl/resources/enums';
import { TProductSubmissionFile } from '@pbl/graphql/student/queries/projectProducts';
import { TTask } from '@pbl/graphql/user/queries/projectProducts';

import { SUBMISSION_GRADE_STATUS } from '@shared/resources/enums';

export type TProduct = {
  description: string;
  displayName: string;
  id: string;
  name: string;
  rubrics: TRubric[];
  submission?: TSubmission;
  submissionsGradingNeededCount: number;
  hidden?: boolean;
  quickTask?: TTask;
};

export type TRubric = {
  criteriaLabels: TCriteriaLabel[];
  criterias: TCriteria[];
  description: string;
  displayName: string;
  headings: THeading[];
  pointsAvailable?: number;
  id: string;
  name: string;
  hasAlignedStatements?: boolean;
};

type TCriteriaLabel = {
  displayName: string;
  id: string;
  score: number;
};

type TCriteria = {
  id: string;
  rubricCriteriaLabelId: string;
  rubricHeadingId: string;
  text: string;
};

type THeading = {
  id: string;
  multiplier: number;
  name: string;
};

export type TCheckInQuestionAnswer = {
  answer: string;
  id: string;
  grade: TCheckInQuestionGrade;
  updatedAt: string;
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
  questionIndex?: number;
  teamSubmission: TCheckInTeamSubmission | null;
  isHidden?: boolean;
  __typename: 'CheckInQuestion';
};

export type TCheckInGroup = {
  displayName: string;
  id: string;
  name: string;
  questions: TCheckInQuestion[];
  step: number;
  __typename: 'CheckInGroup';
};

export type TValues = {
  question: string;
};

export type TSubmission = {
  id: string;
  files: TFile[];
  grade?: TProductSubmissionGrade;
  status: PRODUCT_SUBMISSION_STATUS;
  canSubmit: boolean;
};

export type TProductSubmission = {
  id: string;
  files: TProductSubmissionFile[];
  grade?: TProductSubmissionGrade;
  status: PRODUCT_SUBMISSION_STATUS;
  canSubmit: boolean;
  updatedAt?: string;
};

export type TProductSubmissionGrade = {
  updatedAt: string;
  lastGradedBy: {
    firstName: string;
    lastName: string;
  };
  pointsAvailable: number;
  pointsScored: number;
  results: TSubmissionGradeResults[];
};

export type TSubmissionGradeResults = {
  criteriaId: string;
  trait?: string;
};

type TFile = {
  createdAt: string;
  filename: string;
  googleWeblink: string | null;
  id: string;
  source: string;
  url: string;
  submitter: {
    firstName: string | null;
    lastName: string | null;
    uuid: string;
  };
};

export type TDefinedCareer = {
  id: string;
  name: string;
  type: string;
  thumbnailUrl: string;
  pathwayName: string;
  __typename: string;
};

export type TCheckInTeamSubmission = {
  id: string;
  grade: TCheckInQuestionGrade;
  answers: {
    answer: string;
    id: string;
    student: {
      uuid: string;
      firstName: string;
      lastName: string;
    };
    updatedAt: string;
  }[];
  canSubmit: boolean;
};
