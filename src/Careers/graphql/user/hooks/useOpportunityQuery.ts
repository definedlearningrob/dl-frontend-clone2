import { useQuery } from '@apollo/client';

import { OPPORTUNITY_QUERY, TOpportunityApplicationFilter } from '../queries/opportunities';

export const useOpportunityQuery = ({
  id,
  filter,
  skip,
  track = true,
}: {
  id: string;
  skip?: boolean;
  track?: boolean;
  filter?: TOpportunityApplicationFilter;
}) => useQuery(OPPORTUNITY_QUERY, { variables: { id, filter, track }, skip });
