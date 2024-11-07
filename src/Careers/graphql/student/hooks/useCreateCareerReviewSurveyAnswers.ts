import { TypedDocumentNode, useMutation } from '@apollo/client';

import CREATE_CAREER_REVIEW_SURVEY_ANSWERS from '@dc/graphql/student/mutations/createCareerReviewSurveyAnswers';
import { CAREER_REVIEW_SURVEY_ANSWER_CONTEXT_TYPES } from '@dc/resources/enums';

type CreateCareerReviewSurveyAnswersData = {
  status: string;
};

export type CareerReviewSurveyAnswer = {
  questionId: string;
  answer: string[];
};

type CreateCareerReviewSurveyAnswersMutationInput = {
  contextId?: string; // course ID || virtual internship ID || undefined
  contextType?: CAREER_REVIEW_SURVEY_ANSWER_CONTEXT_TYPES;
  answers: CareerReviewSurveyAnswer[];
};

type CreateCareerReviewSurveyAnswersMutationVariables = {
  input: CreateCareerReviewSurveyAnswersMutationInput;
};

type Params = {
  refetchQueries: {
    query: TypedDocumentNode;
    variables?: {
      id: string;
    };
  }[];
};

export const useCreateCareerReviewSurveyAnswers = ({ refetchQueries }: Params) => {
  const [mutate, { error, loading }] = useMutation<
    CreateCareerReviewSurveyAnswersData,
    CreateCareerReviewSurveyAnswersMutationVariables
  >(CREATE_CAREER_REVIEW_SURVEY_ANSWERS);

  const createCareerReviewSurveyAnswers = async ({
    contextId,
    contextType,
    answers,
  }: CreateCareerReviewSurveyAnswersMutationInput) => {
    await mutate({
      variables: {
        input: {
          contextId,
          contextType,
          answers,
        },
      },
      refetchQueries,
    });
  };

  return [createCareerReviewSurveyAnswers, { error, loading }] as const;
};
