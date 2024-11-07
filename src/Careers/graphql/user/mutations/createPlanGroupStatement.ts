import { TypedDocumentNode, gql } from '@apollo/client';

import { STATEMENT_QUESTION_TYPE } from '@shared/resources/enums';

export const CREATE_PLAN_GROUP_STATEMENT: TypedDocumentNode<
  CreatePlanGroupStatementData,
  CreatePlanGroupStatementInput
> = gql`
  mutation CreatePlanGroupStatement($input: CreatePlanGroupStatementMutationInput!) {
    createPlanGroupStatement(input: $input) {
      planGroupStatement {
        archivedAt
        id
        name
        step
        isRequired
        question {
          text
          questionType
          options {
            option
            step
          }
        }
      }
    }
  }
`;

type CreatePlanGroupStatementData = {
  createPlanGroupStatement: {
    planGroupStatement: {
      archivedAt: string;
      id: string;
      name: string;
      step: number;
      isRequired: boolean;
      question?: {
        text: string;
        questionType: STATEMENT_QUESTION_TYPE;
        options: {
          option: string;
          step: number;
        }[];
      };
    };
  };
};

type CreatePlanGroupStatementInput = {
  input: {
    name: string;
    planGroupId: string;
    step: number;
    required: boolean;
    question?: {
      text: string;
      questionType: STATEMENT_QUESTION_TYPE;
      options: {
        option: string;
        step: number;
      }[];
    };
  };
};
