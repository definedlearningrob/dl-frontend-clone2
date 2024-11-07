import { gql, TypedDocumentNode } from '@apollo/client';

export const GENERATE_GOAL_PLAN_REPORT: TypedDocumentNode<
  TGenerateGoalPlanReportData,
  TGenerateGoalPlanReportVariables
> = gql`
  mutation GenerateGoalsPlanReport($input: GenerateGoalsPlanReportMutationInput!) {
    generateGoalsPlanReport(input: $input) {
      planReport {
        id
        url
        schoolYear
        uploadStatus
      }
    }
  }
`;

export type TGenerateGoalPlanReportData = {
  generateGoalsPlanReport: {
    planReport: {
      id: string;
      url: string;
      uploadStatus: string;
      periodEnd: string;
    };
  };
};

export type TGenerateGoalPlanReportVariables = {
  input: {
    entityUuids?: string[];
    gradeLevels?: string[];
    planId: string;
    schoolYear?: number;
    statementId?: string;
    userUuids?: string[];
    schoolClassUuids: string[] | null;
  };
};
