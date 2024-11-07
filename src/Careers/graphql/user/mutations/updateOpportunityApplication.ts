import { gql, TypedDocumentNode } from '@apollo/client';

export const UPDATE_OPPORTUNITY_APPLICATION: TypedDocumentNode<
  TOpportunityApplicationData,
  TOpportunityApplicationVariables
> = gql`
  mutation UpdateOpportunityApplication($input: UpdateOpportunityApplicationMutationInput!) {
    updateOpportunityApplication(input: $input) {
      application {
        status
        lastChangedBy {
          name
        }
      }
    }
  }
`;

export type LastChangedBy = {
  name: string;
};

export type TOpportunityApplicationData = {
  updateOpportunityApplication: {
    application: {
      status: string;
      lastChangedBy: LastChangedBy;
    };
  };
};

export type TOpportunityApplicationVariables = {
  input: {
    id: string;
    status: string;
  };
};
