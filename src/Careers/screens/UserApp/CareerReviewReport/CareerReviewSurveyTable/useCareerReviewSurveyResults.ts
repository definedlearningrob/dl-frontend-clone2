import { CareerReviewSurveyReportResultSortColumns, SortOrders } from '@graphql/dc/users/types';
import { useCareerReviewSurveyReportResultsQuery } from '@graphql/dc/users/hooks';

import { useCareerReviewSurveyReportFilters } from '@dc/components/CareerReviewSurveyReport/useCareerReviewSurveyReportFilters';
import { useCareerReviewSurveyResultsFilters } from '@dc/screens/UserApp/CareerReviewReport/useCareerReviewSurveyReportResultsFilters';

import { DEFAULT_PAGE_SIZE } from '@shared/components/NewTable/NewTable';

export const useCareerReviewSurveyResults = () => {
  const { variables } = useCareerReviewSurveyReportFilters();
  const { filters } = useCareerReviewSurveyResultsFilters();

  return useCareerReviewSurveyReportResultsQuery({
    variables: {
      filter: variables.filter,
      resultsFilter: filters,
      sort: {
        column: CareerReviewSurveyReportResultSortColumns.STUDENT_SIS_ID,
        order: SortOrders.DESC,
      },
      page: 1,
      perPage: DEFAULT_PAGE_SIZE,
    },
    fetchPolicy: 'no-cache',
  });
};
