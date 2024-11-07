import { TypedDocumentNode, gql } from '@apollo/client';

export const PLAN_STATEMENT_BREAKDOWN: TypedDocumentNode<
  TPlanStatementReportData,
  TPlanStatementReportVariables
> = gql`
  query PlanStatementBreakdown($filter: PlanReportFilter!, $statementId: ID!) {
    reports {
      planReport(filter: $filter) {
        statementBreakdown(statementId: $statementId) {
          completed
          inProgress
          notMet
          notStarted
        }
      }
    }
  }
`;

export type TPlanStatementReportVariables = {
  filter: {
    planId: string;
    entityUuids?: string[];
    schoolYear?: number;
    gradeLevels?: string[];
    userUuids?: string[];
  };
  statementId: string;
};

type TPlanStatementReportData = {
  reports: {
    planReport: {
      statementBreakdown: {
        completed: number;
        inProgress: number;
        notMet: number;
        notStarted: number;
      };
    };
  };
};
