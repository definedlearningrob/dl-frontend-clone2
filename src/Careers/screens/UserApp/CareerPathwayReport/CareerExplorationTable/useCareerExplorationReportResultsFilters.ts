import { useFilters } from '@shared/components/FilterProvider/FilterProvider';

type useCareerExplorationResultsFilters = {
  fullNameOrSisIdCont: string;
  clusterIdIn: string[];
  pathwayIdIn: string[];
};

export const useCareerExplorationReportResultsFilters = () =>
  useFilters<useCareerExplorationResultsFilters>();
