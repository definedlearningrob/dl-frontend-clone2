import type { TUserInfo as DCUserInfo } from '@dc/graphql/user/queries/userInfo';
import type { TStudentInfo as DCStudentInfo } from '@dc/graphql/student/queries/userInfo';

import type { TUserInfo as DLUserInfo } from '@pbl/graphql/user/queries/userInfo';
import type { TStudentInfo as DLStudentInfo } from '@pbl/graphql/student/queries/userInfo';

import { EVALUATION_RESULTS_VALUES, STATEMENT_QUESTION_TYPE } from '@shared/resources/enums';
import {
  PlanStatement as BasePlanStatement,
  PlanGroup as BasePlanGroup,
  TEvidence,
} from '@shared/resources/types';

export type StudentInfo = DCStudentInfo | DLStudentInfo;
export type UserInfo = DCUserInfo | DLUserInfo;

export type TPlanStatementQuestion = {
  id: string;
  text: string;
  questionType: STATEMENT_QUESTION_TYPE;
  options: { option: string; id: string }[];
  answer: { id: string; answer: string[] } | null;
};

export type TPlanStatementResult = {
  createdAt: string;
  evaluator: {
    firstName: string;
    lastName: string;
    uuid: string;
  };
  result: EVALUATION_RESULTS_VALUES | null;
};

export type TPlanStatementComment = {
  createdAt: string;
  author: {
    firstName: string;
    lastName: string;
    uuid: string;
  };
  body: string;
};

export type ActivityItem = {
  author: {
    firstName: string;
    lastName: string;
    uuid: string;
  };
  createdAt: string;
  body?: string;
  result?: EVALUATION_RESULTS_VALUES | null;
};

export type TPlanStatement = Pick<BasePlanStatement, 'id' | 'name' | 'isLocked'> & {
  isRequired?: boolean;
  status: TPlanStatementResult | null;
  evaluationId: string;
  question: TPlanStatementQuestion | null;
  evidences: TEvidence[];
  results: TPlanStatementResult[];
  comments: TPlanStatementComment[];
  activityHistory: ActivityItem[];
};

export type TPlanGroup = Pick<BasePlanGroup, 'id' | 'displayName' | 'name' | 'description'> & {
  status: EVALUATION_RESULTS_VALUES;
  statements: TPlanStatement[];
};
