import { gql } from '@apollo/client';

import { TASK_STATUS } from '@pbl/resources/enums';

export default gql`
  mutation UpdateProjectStatus($input: UpdateTaskMutationInput!) {
    updateTask(input: $input) {
      project: task {
        id
        status
      }
    }
  }
`;

export type TUpdateProjectStatusData = {
  updateTask: {
    project: TUpdateStatusTask;
  };
};

export type TUpdateProjectStatusVariables = {
  input: TUpdateStatusTask;
};

type TUpdateStatusTask = {
  id: string;
  status: TASK_STATUS;
};
