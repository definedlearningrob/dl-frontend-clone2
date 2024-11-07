import { gql } from '@apollo/client';

export default gql`
  mutation UpdateTask($input: UpdateTaskMutationInput!) {
    updateTask(input: $input) {
      task {
        id
      }
    }
  }
`;
