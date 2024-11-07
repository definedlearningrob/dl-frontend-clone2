import { gql } from '@apollo/client';

export default gql`
  mutation generateCareerReviewSurveyReport(
    $input: GenerateCareerReviewSurveyReportMutationInput!
  ) {
    generateCareerReviewSurveyReport(input: $input) {
      report {
        id
        url
        uploadStatus
      }
    }
  }
`;
