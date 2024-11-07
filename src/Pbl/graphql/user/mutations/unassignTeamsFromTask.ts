import { gql } from '@apollo/client';

export default gql`
  mutation UnassignTeamsFromTask($input: UnassignTeamsFromTaskMutationInput!) {
    unassignTeamsFromTask(input: $input) {
      teams {
        uuid
      }
    }
  }
`;

export type TUnassignTeamsFromTaskVariables = {
  input: TUnassignTeamsFromTaskInput;
};

export type TUnassignTeamsFromTaskInput = {
  taskId: string;
  teamUuids: string[];
};

export type TUnassignTeamsFromTaskData = {
  unassignTeamsFromTask: {
    teams: { uuid: string }[];
  };
};
