import { gql, TypedDocumentNode } from '@apollo/client';

export const GENERATE_GOALS_PERFORMANCE_INDICATORS_REPORT: TypedDocumentNode<
  TGenerateGoalsPerformanceIndicatorsReportData,
  TGenerateGoalsPerformanceIndicatorsReportVariables
> = gql`
  mutation GenerateGoalsPerformanceIndicatorsReport(
    $input: GenerateGoalsPerformanceIndicatorsReportMutationInput!
  ) {
    generateGoalsPerformanceIndicatorsReport(input: $input) {
      performanceIndicatorsReport {
        id
      }
    }
  }
`;

export type TGenerateGoalsPerformanceIndicatorsReportData = {
  generateGoalsPerformanceIndicatorsReport: {
    performanceIndicatorsReport: {
      id: string;
    };
  };
};

export type TGenerateGoalsPerformanceIndicatorsReportVariables = {
  input: {
    tagIds: string[];
    entityUuids: string[];
    gradeLevels: string[];
    startYear: number;
  };
};
