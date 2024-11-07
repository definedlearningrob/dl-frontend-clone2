import { gql } from '@apollo/client';

export default gql`
  mutation ArchiveProject($input: ArchiveTaskMutationInput!) {
    archiveTask(input: $input) {
      task {
        id
        isArchived
      }
    }
  }
`;

export type TArchiveProjectData = {
  archiveTask: {
    task: {
      id: string;
      isArchived: boolean;
    };
  };
};

export type TArchiveProjectsVariables = {
  input: {
    id: string;
  };
};
