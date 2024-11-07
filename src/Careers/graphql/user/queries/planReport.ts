import { gql } from '@apollo/client';

import { UploadReportStatuses } from '@dc/resources/enums';

export default gql`
  query PlanReport($id: ID!) {
    planReport(id: $id) {
      id
      uploadStatus
      url(options: { responseContentDisposition: "attachment" })
    }
  }
`;

export type TPlanReport = {
  id: string;
  uploadStatus: UploadReportStatuses;
  url: string;
};

export type TPlanReportData = {
  planReport: TPlanReport;
};

export type TPlanReportVariables = {
  id: string;
};
