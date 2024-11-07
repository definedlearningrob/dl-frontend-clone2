import { gql } from '@apollo/client';

import { ReportLevels } from '@dc/resources/enums';

export default gql`
  mutation GenerateCourseReport($input: GenerateCourseReportMutationInput!) {
    generateCourseReport(input: $input) {
      courseReport {
        id
      }
    }
  }
`;

export type TGenerateCourseReportData = {
  generateCourseReport: {
    courseReport: {
      id: string;
    };
  };
};

export type TGenerateCourseReportVariables = {
  input: {
    level: ReportLevels;
    levelUuid: string;
    startYear: number;
  };
};
