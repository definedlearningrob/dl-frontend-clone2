import { gql } from '@apollo/client';

gql`
  query CareerReviewSurveyReportCSV($id: ID!) {
    careerReviewSurveyReport(id: $id) {
      id
      url(options: { responseContentDisposition: "attachment" })
      uploadStatus
    }
  }
`;
