import { gql } from '@apollo/client';

import { UploadReportStatuses } from '@dc/resources/enums';

export default gql`
  query CourseReport($id: ID!) {
    courseReport(id: $id) {
      id
      uploadStatus
      url(options: { responseContentDisposition: "attachment" })
    }
  }
`;

export type TCourseReport = {
  id: string;
  uploadStatus: UploadReportStatuses;
  url: string;
};

export type TCourseReportData = {
  courseReport: TCourseReport;
};

export type TCourseReportVariables = {
  id: string;
};
