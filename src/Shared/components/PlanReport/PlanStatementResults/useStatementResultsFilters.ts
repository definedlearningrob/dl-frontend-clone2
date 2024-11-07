import { useFilters } from '@shared/components/FilterProvider/FilterProvider';
import { EVALUATION_RESULTS_VALUES } from '@shared/resources/enums';

type StatementResultsFilters = {
  fullNameOrSisIdCont: string;
  resultEq: EVALUATION_RESULTS_VALUES | null;
};

export const useStatementResultsFilters = () => useFilters<StatementResultsFilters>();
