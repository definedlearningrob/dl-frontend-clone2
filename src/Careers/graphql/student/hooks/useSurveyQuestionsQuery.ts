import { useQuery } from '@apollo/client';

import {
  SURVEY_QUESTIONS_QUERY,
  SurveyQuestionsData,
} from '@dc/graphql/student/queries/surveyQuestions';

type Params = {
  skip?: boolean;
};

export const useSurveyQuestionsQuery = ({ skip }: Params = {}) =>
  useQuery<SurveyQuestionsData>(SURVEY_QUESTIONS_QUERY, {
    skip,
  });
