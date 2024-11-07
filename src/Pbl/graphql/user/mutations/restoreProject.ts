import { gql } from '@apollo/client';

export default gql`
  mutation RestoreProject($input: RestoreTaskMutationInput!) {
    restoreTask(input: $input) {
      task {
        id
        isArchived
      }
    }
  }
`;

export type TRestoreProjectData = {
  restoreTask: {
    task: {
      id: string;
      isArchived: boolean;
    };
  };
};

export type TRestoreProjectsVariables = {
  input: {
    id: string;
  };
};
