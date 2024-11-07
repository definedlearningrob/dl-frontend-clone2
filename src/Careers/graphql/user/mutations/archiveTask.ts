import { gql } from '@apollo/client';

export default gql`
  mutation ArchiveTask($input: ArchiveTaskMutationInput!) {
    archiveTask(input: $input) {
      task {
        archivedAt
        id
      }
    }
  }
`;
