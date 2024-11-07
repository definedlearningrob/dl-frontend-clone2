import { TypedDocumentNode, gql } from '@apollo/client';

export const RECOMMEND_OPPORTUNITY: TypedDocumentNode<
  TRecommendOpportunityData,
  TRecommendOpportunityMutationInput
> = gql`
  mutation RecommendOpportunity($input: RecommendOpportunityMutationInput!) {
    recommendOpportunity(input: $input) {
      status
    }
  }
`;

export type TRecommendOpportunityMutationInput = {
  input: {
    opportunityId: string;
    studentUuids: string[];
  };
};

export type TRecommendOpportunityData = {
  recommendOpportunity: {
    status: string;
  };
};
