import { gql } from '@apollo/client';

export default gql`
  mutation CreateTask($input: CreateTaskMutationInput!) {
    createTask(input: $input) {
      task {
        id
      }
    }
  }
`;
