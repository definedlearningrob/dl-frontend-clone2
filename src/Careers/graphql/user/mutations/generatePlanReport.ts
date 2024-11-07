import { gql } from '@apollo/client';

import { ReportLevels } from '@dc/resources/enums';

export default gql`
  mutation GeneratePlanReport($input: GeneratePlanReportMutationInput!) {
    generatePlanReport(input: $input) {
      planReport {
        id
      }
    }
  }
`;

export type TGeneratePlanReportData = {
  generatePlanReport: {
    planReport: {
      id: string;
    };
  };
};

export type TGeneratePlanReportVariables = {
  input: {
    level: ReportLevels;
    levelUuid: string;
    planId: string;
    startYear: number;
  };
};
