import { gql } from '@apollo/client';

export default gql`
  mutation UpdatePlan($input: UpdatePlanMutationInput!) {
    updatePlan(input: $input) {
      plan {
        archivedAt
        description
        id
        name
        groups {
          archivedAt
          description
          displayName
          id
          name
          step
          statements {
            id
            name
            step
          }
        }
      }
    }
  }
`;
