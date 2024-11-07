import { TypedDocumentNode, gql } from '@apollo/client';

import { TCareerReviewSurveyQuestion } from '@dc/resources/types';

export const SURVEY_QUESTIONS_QUERY: TypedDocumentNode<SurveyQuestionsData, undefined> = gql`
  query SurveyQuestions {
    surveyQuestions {
      id
      question
      type
      options {
        step
        option
      }
    }
  }
`;

export type SurveyQuestionsData = {
  surveyQuestions: TCareerReviewSurveyQuestion[];
};
