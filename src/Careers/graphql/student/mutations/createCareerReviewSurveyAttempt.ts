import { gql, TypedDocumentNode } from '@apollo/client';

export const CREATE_CAREER_REVIEW_SURVEY_ATTEMPT: TypedDocumentNode<
  TCreateReviewSurveyAttemptData,
  TCreateReviewSurveyAttemptInput
> = gql`
  mutation CreateCareerReviewSurveyAttempt($input: CreateCareerReviewSurveyAttemptMutationInput!) {
    createCareerReviewSurveyAttempt(input: $input) {
      careerReviewSurveyAttempt {
        id
        status
      }
    }
  }
`;

type CareerReviewSurveyAttempt = {
  id: string;
  status: string;
};

type TCreateReviewSurveyAttemptData = {
  careerReviewSurveyAttempt: CareerReviewSurveyAttempt;
};

type TCreateReviewSurveyAttemptInput = {
  input: {
    contextType?: string;
    contextId?: string;
  };
};
