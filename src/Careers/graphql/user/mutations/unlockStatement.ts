import { gql } from '@apollo/client';

export default gql`
  mutation UnlockStatement($input: UnlockStatementMutationInput!, $planId: ID!) {
    unlockStatement(input: $input) {
      student {
        uuid
        plan(id: $planId) {
          groups {
            id
            statements {
              id
              isLocked
            }
          }
        }
      }
    }
  }
`;
