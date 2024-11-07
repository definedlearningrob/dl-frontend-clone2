import { useOpportunityReportFullDataQuery } from '@graphql/dc/users/hooks';
import { isEmpty, omitBy } from 'lodash-es';

import { useOpportunityReportFilters } from '@dc/components/OpportunityReport/useOpportunityReportFilters';
import { useOpportunityReportResultsFilters } from '@dc/screens/UserApp/OpportunityReport/OpportunityTable/useOpportunityReportResultsFilters';

import { DEFAULT_PAGE_SIZE } from '@shared/components/NewTable/NewTable';

export const useOpportunityResults = () => {
  const { variables } = useOpportunityReportFilters();
  const { filters } = useOpportunityReportResultsFilters();

  const filtersWithoutEmptyValues = omitBy(filters, (value) => isEmpty(value));

  return useOpportunityReportFullDataQuery({
    variables: {
      filter: variables.filter,
      resultsFilter: filtersWithoutEmptyValues,
      page: 1,
      perPage: DEFAULT_PAGE_SIZE,
    },
    fetchPolicy: 'no-cache',
  });
};
