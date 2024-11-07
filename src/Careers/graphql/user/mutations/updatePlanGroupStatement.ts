import { TypedDocumentNode, gql } from '@apollo/client';

import { STATEMENT_QUESTION_TYPE } from '@shared/resources/enums';

export const UPDATE_PLAN_GROUP_STATEMENT: TypedDocumentNode<
  UpdatePlanGroupStatementData,
  UpdatePlanGroupStatementInput
> = gql`
  mutation UpdatePlanGroupStatement($input: UpdatePlanGroupStatementMutationInput!) {
    updatePlanGroupStatement(input: $input) {
      planGroupStatement {
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

type UpdatePlanGroupStatementData = {
  updatePlanGroupStatement: {
    planGroupStatement: {
      id: string;
      name: string;
      step: number;
      isRequired: boolean;
      question: {
        type: string;
        questionType: STATEMENT_QUESTION_TYPE;
        options: {
          option: string;
          step: number;
        }[];
      };
    };
  };
};

type UpdatePlanGroupStatementInput = {
  input: {
    id: string;
    name: string;
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
