import { gql } from '@apollo/client';

export default gql`
  mutation UnassignStandardSetFromEntity($input: UnassignStandardSetFromEntityMutationInput!) {
    unassignStandardSetFromEntity(input: $input) {
      standardSet {
        id
        entities {
          nodes {
            standardSets {
              id
            }
            uuid
          }
        }
      }
    }
  }
`;
