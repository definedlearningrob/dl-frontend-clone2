import { gql } from '@apollo/client';

export default gql`
  mutation LockStatement($input: LockStatementMutationInput!, $planId: ID!) {
    lockStatement(input: $input) {
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
