import { gql } from '@apollo/client';

export default gql`
  mutation UnassignPlanFromEntity($input: UnassignPlanFromEntityMutationInput!) {
    unassignPlanFromEntity(input: $input) {
      plan {
        id
      }
    }
  }
`;
