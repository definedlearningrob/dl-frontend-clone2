import { TypedDocumentNode, gql } from '@apollo/client';

import { STATEMENT_QUESTION_TYPE } from '@shared/resources/enums';

export const PLAN_STATEMENT_OPTIONS: TypedDocumentNode<
  TPlanStatementOptionsData,
  TPlanStatementOptionsVariables
> = gql`
  query PlanStatementOptions($id: ID!) {
    plan(id: $id) {
      id
      groups {
        id
        name
        statements {
          id
          name
          isRequired
          question {
            text
            options {
              id
              option
            }
          }
        }
      }
    }
  }
`;

type PlanStatementOption = {
  id: string;
  name: string;
  isRequired: boolean;
  question: {
    text: string;
    questionType: STATEMENT_QUESTION_TYPE;
    options: { option: string; id: string }[];
  } | null;
};

export type TPlanStatementOptionsData = {
  plan: {
    id: string;
    groups: {
      id: string;
      name: string;
      statements: PlanStatementOption[];
    }[];
  };
};

export type TPlanStatementOptionsVariables = {
  id: string;
};
