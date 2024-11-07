import { gql } from '@apollo/client';

import { PLAN_FRAGMENT, TPlan } from '../fragments/plan';

export default gql`
  mutation UnlockStatement($input: UnlockStatementMutationInput!, $planId: ID!) {
    unlockStatement(input: $input) {
      student {
        uuid
        plan(id: $planId) {
          ...Plan
        }
      }
    }
  }
  ${PLAN_FRAGMENT}
`;

export type TUnlockStatement = {
  student: {
    uuid: string;
    plan: TPlan;
  };
};

export type TUnlockStatementData = {
  unlockStatement: TUnlockStatement;
};

export type TUnlockStatementInput = {
  studentUuid: string;
  statementId: string;
};

export type TUnlockStatementVariables = {
  input: TUnlockStatementInput;
  planId: string;
};
