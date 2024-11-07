export type SURVEY_QUESTION_TYPE = 'single_choice' | 'multiple_choice';

type CareerReviewSurveyQuestionOption = {
  option: string;
  step: number;
};

type CareerReviewSurveyQuestion = {
  answer: string[];
  id: string;
  options: CareerReviewSurveyQuestionOption[];
  question: string;
  type: SURVEY_QUESTION_TYPE;
};

export type CareerReviewSurvey = {
  __typename: string;
  questions: CareerReviewSurveyQuestion[];
  performed: boolean;
  version: number;
};
