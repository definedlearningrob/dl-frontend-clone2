import { gql, TypedDocumentNode } from '@apollo/client';

import { TOpportunity } from '@dc/resources/types';

export const OPPORTUNITY_PERIODS_QUERY: TypedDocumentNode<
  TOpportunityPeriodsData,
  TOpportunityPeriodsVariables
> = gql`
  query OpportunityPeriods($id: ID!) {
    opportunity(id: $id) {
      id
      periodStart
      periodEnd
    }
  }
`;

export type TOpportunityPeriodsData = {
  opportunity: Pick<TOpportunity, 'id' | 'periodStart' | 'periodEnd'>;
};

export type TOpportunityPeriodsVariables = {
  id: string;
};
