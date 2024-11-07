import { gql } from '@apollo/client';

export default gql`
  mutation AssignPlanToEntity($input: AssignPlanToEntityMutationInput!) {
    assignPlanToEntity(input: $input) {
      plan {
        id
      }
    }
  }
`;
