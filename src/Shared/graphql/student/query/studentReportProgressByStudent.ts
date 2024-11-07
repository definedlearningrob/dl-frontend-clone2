import { gql, TypedDocumentNode } from '@apollo/client';

import { TEvidence } from '@shared/resources/types';
import { EVALUATION_RESULTS_VALUES, STATEMENT_QUESTION_TYPE } from '@shared/resources/enums';
import { PLAN_IN_STUDENT_REPORT_FRAGMENT } from '@shared/graphql/fragments/planInStudentReport';
import {
  GOAL_PERFORMANCE_INDICATORS_DATA_FRAGMENT,
  TPerformanceIndicatorsData,
} from '@shared/graphql/fragments/goalPerformanceIndicatorsData';

export const STUDENT_REPORT_PROGRESS_BY_STUDENT: TypedDocumentNode<
  TStudentReportProgressData,
  TStudentReportProgressByStudentVariables
> = gql`
  ${PLAN_IN_STUDENT_REPORT_FRAGMENT}
  ${GOAL_PERFORMANCE_INDICATORS_DATA_FRAGMENT}
  query StudentReportByStudent($planId: ID!) {
    studentReport(planId: $planId) {
      overallData {
        completed
        inProgress
        notStarted
        studentFullName
        planName
        notMet
      }
      plan {
        ...PlanForStudentReport
      }
      goalPerformanceIndicatorsData {
        ...GoalPerformanceIndicatorsData
      }
    }
  }
`;

export type TStudentReportProgressByStudentVariables = {
  planId: string;
  studentUuid?: string;
};

export type TStudentReportProgressData = {
  studentReport: {
    overallData: TOverallData;
    plan: TPlanData;
    goalPerformanceIndicatorsData: TPerformanceIndicatorsData;
  };
};

export type TOverallData = {
  completed: number;
  inProgress: number;
  notStarted: number;
  studentFullName: string;
  planName: string;
  notMet: number;
};

export type TPlanData = {
  groups: TPlanGroup[];
  name: string;
  id: string;
  description: string;
};

export type TPlanGroup = {
  name: string;
  displayName: string;
  id: string;
  description: string;
  statements: TPlanGroupStatement[];
  step: number;
};

export type TPlanGroupStatement = {
  id: string;
  name: string;
  step: number;
  isRequired: boolean;
  question: TQuestion | null;
  evidences: TEvidence[];
  results: TResult[];
};

export type TResult = {
  result: EVALUATION_RESULTS_VALUES;
  createdAt: string;
};

export type TQuestion = {
  id: string;
  text: string;
  questionType: STATEMENT_QUESTION_TYPE;
  options: TOption[];
  answer: TAnswer;
};

export type TOption = {
  option: string;
  id: string;
};

export type TAnswer = {
  answer: string[];
  id: string;
};
