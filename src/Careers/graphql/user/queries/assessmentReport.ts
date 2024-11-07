import { gql, TypedDocumentNode } from '@apollo/client';

import { UploadReportStatuses } from '@dc/resources/enums';

export const ASSESSMENT_REPORT_FILE: TypedDocumentNode<
  TAssessmentReportData,
  TAssessmentReportVariables
> = gql`
  query AssessmentReport($id: ID!) {
    assessmentReport(id: $id) {
      id
      uploadStatus
      url(options: { responseContentDisposition: "attachment" })
    }
  }
`;

export type TAssessmentReport = {
  id: string;
  uploadStatus: UploadReportStatuses;
  url: string;
};

export type TAssessmentReportData = {
  assessmentReport: TAssessmentReport;
};

export type TAssessmentReportVariables = {
  id: string;
};
