import { gql } from '@apollo/client';

export default gql`
  mutation AssignStandardSetToEntity($input: AssignStandardSetToEntityMutationInput!) {
    assignStandardSetToEntity(input: $input) {
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
