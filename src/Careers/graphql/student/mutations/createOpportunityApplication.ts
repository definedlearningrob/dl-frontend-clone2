import { gql, TypedDocumentNode } from '@apollo/client';

export const CREATE_OPPORTUNITY_APPLICATION: TypedDocumentNode<
  TCreateOpportunityApplicationData,
  TCreateOpportunityApplicationVariables
> = gql`
  mutation CreateOpportunityApplication($input: CreateOpportunityApplicationMutationInput!) {
    createOpportunityApplication(input: $input) {
      opportunityApplication {
        status
        answers {
          question {
            id
          }
          answer
        }
        opportunity {
          id
          applicationStatus
        }
      }
    }
  }
`;

type TCreateOpportunityApplication = {
  status: string;
  answers: {
    question: { id: string };
    answer: string;
  };
  opportunity: {
    id: string;
    applicationStatus?: string;
  };
};

export type TCreateOpportunityApplicationData = {
  createOpportunityApplication: TCreateOpportunityApplication;
};

export type TCreateOpportunityApplicationVariables = {
  input: {
    opportunityId: number;
    answers?: {
      questionId: string;
      answer: string;
    }[];
  };
};
