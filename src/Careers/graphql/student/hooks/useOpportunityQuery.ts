import { useQuery } from '@apollo/client';

import { OPPORTUNITY_QUERY } from '../queries/opportunity';

export const useOpportunityQuery = ({
  id,
  skip,
  track = true,
  trackVI = false,
}: {
  id: string;
  skip?: boolean;
  track?: boolean;
  trackVI?: boolean;
}) =>
  useQuery(OPPORTUNITY_QUERY, {
    variables: { id, track, trackVI },
    skip,
  });
