import { gql, TypedDocumentNode } from '@apollo/client';

import { ReportLevels } from '@dc/resources/enums';

export const GENERATE_ASSESSMENT_REPORT: TypedDocumentNode<
  TGenerateAssessmentReportData,
  TGenerateAssessmentReportVariables
> = gql`
  mutation GenerateAssessmentReport($input: GenerateAssessmentReportMutationInput!) {
    generateAssessmentReport(input: $input) {
      assessmentReport {
        id
      }
    }
  }
`;

export type TGenerateAssessmentReportData = {
  generateAssessmentReport: {
    assessmentReport: {
      id: string;
    };
  };
};

export type TGenerateAssessmentReportVariables = {
  input: {
    level?: ReportLevels;
    levelUuid?: string;
    startYear: number;
    entityUuids?: string[];
    gradeLevels?: string[];
    userUuids?: string[];
  };
};
