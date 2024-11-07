import { gql } from '@apollo/client';

gql`
  mutation UpdateEntityPlans($input: UpdateEntityPlansMutationInput!) {
    updateEntityPlans(input: $input) {
      entity {
        uuid
        name
      }
    }
  }
`;
