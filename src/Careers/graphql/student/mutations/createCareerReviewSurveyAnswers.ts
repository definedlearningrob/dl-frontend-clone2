import { gql } from '@apollo/client';

export default gql`
  mutation CreateCareerReviewSurveyAnswers($input: CreateCareerReviewSurveyAnswersMutationInput!) {
    createCareerReviewSurveyAnswers(input: $input) {
      status
    }
  }
`;
