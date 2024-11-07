import { useFilters } from '@shared/components/FilterProvider/FilterProvider';

type useOpportunityResultsFilters = {
  studentSearchableColumnsCont: string;
  clusterIdIn: string[];
  pathwayIdIn: string[];
};

export const useOpportunityReportResultsFilters = () => useFilters<useOpportunityResultsFilters>();
