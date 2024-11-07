import { gql } from '@apollo/client';

export default gql`
  mutation AssignTeamsToTask($input: AssignTeamsToTaskMutationInput!) {
    assignTeamsToTask(input: $input) {
      teams {
        uuid
      }
    }
  }
`;

export type TAssignTeamsToTaskVariables = {
  input: TAssignTeamsToTaskInput;
};

export type TAssignTeamsToTaskInput = {
  taskId: string;
  teamUuids: string[];
};

export type TAssignTeamsToTaskData = {
  assignTeamsToTask: {
    teams: { uuid: string }[];
  };
};
