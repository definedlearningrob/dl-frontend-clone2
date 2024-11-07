import { OpportunityTypes } from '@graphql/dc/users/types';

import { useFilters } from '@shared/components/FilterProvider/FilterProvider';

export type PartnerCoursesFilters = {
  pathwayIdIn: string[];
  pathwaysIdIn: string[];
  collectionIdIn: string[];
  includeGlobal: boolean;
  nameCont: string;
  typeIn: OpportunityTypes[];
};

export const usePartnerCustomFilters = () => useFilters<PartnerCoursesFilters>();
