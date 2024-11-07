import { gql } from '@apollo/client';

export default gql`
  mutation CreatePlan($input: CreatePlanMutationInput!) {
    createPlan(input: $input) {
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
