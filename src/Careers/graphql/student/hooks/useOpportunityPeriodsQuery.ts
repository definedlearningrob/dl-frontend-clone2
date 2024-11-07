import { useQuery } from '@apollo/client';

import { OPPORTUNITY_PERIODS_QUERY } from '@dc/graphql/student/queries/opportunityPeriods';

export const useOpportunityPeriodsQuery = ({ id, skip }: TOpportunityQueryProps) =>
  useQuery(OPPORTUNITY_PERIODS_QUERY, {
    variables: { id },
    skip,
  });

export type TOpportunityQueryProps = {
  id: string;
  skip?: boolean;
};
