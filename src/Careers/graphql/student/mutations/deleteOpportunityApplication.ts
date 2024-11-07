import { gql, TypedDocumentNode } from '@apollo/client';

export const DELETE_OPPORTUNITY_APPLICATION: TypedDocumentNode<
  TDeleteOpportunityApplicationData,
  TDeleteOpportunityApplicationVariables
> = gql`
  mutation DeleteOpportunityApplication($input: DeleteOpportunityApplicationMutationInput!) {
    deleteOpportunityApplication(input: $input) {
      status
    }
  }
`;

type TDeleteOpportunity = {
  status: string;
};

export type TDeleteOpportunityApplicationData = {
  deleteOpportunityApplication: TDeleteOpportunity;
};

export type TDeleteOpportunityApplicationVariables = {
  input: {
    opportunityApplicationId: string;
  };
};
