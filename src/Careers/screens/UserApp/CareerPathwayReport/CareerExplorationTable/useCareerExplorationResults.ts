import { useCareerExplorationReportFullDataQuery } from '@graphql/dc/users/hooks';
import { isEmpty, omitBy } from 'lodash-es';

import { useCareerExplorationReportFilters } from '@dc/components/CareerPathwayReport/useCareerExplorationReportFilters';
import { useCareerExplorationReportResultsFilters } from '@dc/screens/UserApp/CareerPathwayReport/CareerExplorationTable/useCareerExplorationReportResultsFilters';

import { DEFAULT_PAGE_SIZE } from '@shared/components/NewTable/NewTable';

export const useCareerExplorationResults = () => {
  const { variables } = useCareerExplorationReportFilters();
  const { filters } = useCareerExplorationReportResultsFilters();

  const filtersWithoutEmptyValues = omitBy(filters, (value) => isEmpty(value));

  return useCareerExplorationReportFullDataQuery({
    variables: {
      filter: variables.filter,
      resultsFilter: filtersWithoutEmptyValues,
      page: 1,
      perPage: DEFAULT_PAGE_SIZE,
    },
    fetchPolicy: 'no-cache',
  });
};
