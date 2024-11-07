import { TypedDocumentNode, gql } from '@apollo/client';

export const GOAL_PERFORMANCE_INDICATORS_REPORT: TypedDocumentNode<
  TGoalsPerformanceIndicatorsReportData,
  TGoalsPerformanceIndicatorsReportVariables
> = gql`
  query GoalsPerformanceIndicatorsReport($id: ID!) {
    goalsPerformanceIndicatorsReport(id: $id) {
      id
      url(options: { responseContentDisposition: "attachment" })
      uploadStatus
    }
  }
`;

export type TGoalsPerformanceIndicatorsReportData = {
  goalsPerformanceIndicatorsReport: {
    id: string;
    url: string;
    uploadStatus: string;
  };
};

export type TGoalsPerformanceIndicatorsReportVariables = {
  id: string;
};
