import { gql } from '@apollo/client';

import { PLAN_FRAGMENT, TPlan } from '../fragments/plan';

export default gql`
  mutation LockStatement($input: LockStatementMutationInput!, $planId: ID!) {
    lockStatement(input: $input) {
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

export type TLockStatement = {
  student: {
    uuid: string;
    plan: TPlan;
  };
};

export type TLockStatementData = {
  lockStatement: TLockStatement;
};

export type TLockStatementInput = {
  studentUuid: string;
  statementId: string;
};

export type TLockStatementVariables = {
  input: TLockStatementInput;
  planId: string;
};
