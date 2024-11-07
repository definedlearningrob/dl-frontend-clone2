import { type TStudentInfo as TDCStudentInfo } from '@dc/graphql/student/queries/userInfo';
import type { AssessmentType } from '@dc/resources/enums';

import { type TStudentInfo as TPblStudentInfo } from '@pbl/graphql/student/queries/userInfo';
import { type TUserInfo } from '@pbl/graphql/user/queries/userInfo';

import {
  PORTFOLIO_PROJECT_SUBMISSION_STATUS,
  SUBMISSION_FILE_SOURCE,
} from '@shared/resources/enums';

type TStudentInfoSettings = {
  assessmentEnabled: boolean;
  assessmentType: AssessmentType;
  onboardingEnabled: boolean;
  selfEvaluationEnabled: boolean;
};

export type TCurrentUserInfo = TPblStudentInfo &
  TDCStudentInfo &
  TUserInfo & {
    settings: TStudentInfoSettings;
  };

export type TSubmitter = {
  uuid: string;
  firstName: string;
  lastName: string;
};

export type TPortfolioSubmissionFile = {
  isOwner?: boolean;
  filename: string;
  googleWeblink: string;
  source: SUBMISSION_FILE_SOURCE;
  url: string;
  id: string;
  createdAt: string;
  submitter: TSubmitter;
};

export type TPortfolioSubmission = {
  status: PORTFOLIO_PROJECT_SUBMISSION_STATUS;
  files: TPortfolioSubmissionFile[];
};

export enum PortfolioResourceClass {
  PRODUCT_SUBMISSION = 'PRODUCT_SUBMISSION',
  ASSIGNMENT_SUBMISSION = 'ASSIGNMENT_SUBMISSION',
  PORTFOLIO_PROJECT = 'PORTFOLIO_PROJECT',
  OPPORTUNITY_APPLICATION = 'OPPORTUNITY_APPLICATION',
}

export type TPortfolioProject = {
  description: string;
  id: string;
  imageUrl: string | null;
  name: string;
  parentName: string;
  isTeamSubmission: boolean;
  submission: TPortfolioSubmission;
  thumbnailUrl: string | null;
  finishedAt: string;
  type: PortfolioProjectType;
  resourceClass: PortfolioResourceClass;
  isHighlighted: boolean;
};

export enum PortfolioProjectType {
  'LESSON' = 'LESSON',
  'OPPORTUNITY' = 'OPPORTUNITY',
  'VIRTUAL_INTERNSHIP' = 'VIRTUAL_INTERNSHIP',
}

export type TPortfolioProjectPageInfo = {
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
};
