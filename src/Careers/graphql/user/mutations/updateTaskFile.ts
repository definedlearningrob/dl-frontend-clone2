import { gql } from '@apollo/client';

export default gql`
  mutation UpdateTaskFile($input: UpdateTaskFileMutationInput!) {
    updateTaskFile(input: $input) {
      taskFile {
        description
        displayName
        filename
        id
        step
        task {
          id
        }
        url
      }
    }
  }
`;
