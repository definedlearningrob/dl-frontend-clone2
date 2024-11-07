import { TypedDocumentNode, gql } from '@apollo/client';

export const PLAN_REPORT: TypedDocumentNode<TPlanReportData, TPlanReportVariables> = gql`
  query PlanReport($filter: PlanReportFilter!) {
    reports {
      planReport(filter: $filter) {
        summary {
          studentsTotal
          studentsInProgress
          studentsCompleted
          averageCompletion
        }
        groups {
          notStarted
          inProgress
          completed
          notMet
          group {
            id
            name
          }
        }
      }
    }
  }
`;

export type TPlanReportVariables = {
  filter: {
    planId: string;
    entityUuids?: string[];
    schoolYear?: number;
    gradeLevels?: string[];
    userUuids?: string[];
  };
};

export type PlanGroupReport = {
  notStarted: number;
  inProgress: number;
  completed: number;
  notMet: number;
  group: {
    id: string;
    name: string;
  };
  __typename: 'PlanGroupBreakdown';
};

export type TPlanReportData = {
  reports: {
    planReport: {
      summary: {
        studentsTotal: number;
        studentsInProgress: number;
        studentsCompleted: number;
        averageCompletion: number;
      };
      groups: PlanGroupReport[];
    };
  };
};
