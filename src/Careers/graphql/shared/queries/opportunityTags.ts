import { gql } from '@apollo/client';

export const OPPORTUNITY_TAGS = gql`
  query OpportunityTags {
    opportunityTags
  }
`;

export type TOpportunityTagsData = {
  opportunityTags: string[];
};
