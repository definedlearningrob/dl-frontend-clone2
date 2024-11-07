import { CareerReviewSurveyAnswerContextTypes } from '@graphql/dc/users/types';

import { useFilters } from '@shared/components/FilterProvider/FilterProvider';

type CareerReviewSurveyReportResultsFilters = {
  fullNameOrSisIdCont: string;
  contextTypeIn: CareerReviewSurveyAnswerContextTypes[];
};

export const useCareerReviewSurveyResultsFilters = () =>
  useFilters<CareerReviewSurveyReportResultsFilters>();
