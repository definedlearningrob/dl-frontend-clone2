import { useQuery } from '@apollo/client';

import { OPPORTUNITY_TAGS, TOpportunityTagsData } from '@dc/graphql/shared/queries/opportunityTags';

export const useOpportunityTagsQuery = () => useQuery<TOpportunityTagsData>(OPPORTUNITY_TAGS);
