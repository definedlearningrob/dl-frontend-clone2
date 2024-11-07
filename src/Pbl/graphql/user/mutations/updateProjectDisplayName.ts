import { gql } from '@apollo/client';

export default gql`
  mutation UpdateTask($input: UpdateTaskMutationInput!) {
    updateTask(input: $input) {
      project: task {
        id
        displayName
      }
    }
  }
`;

export type TUpdateDisplayNameData = {
  updateTask: {
    project: TUpdateDisplayNameTask;
  };
};

export type TUpdateDisplayNameVariables = {
  input: TUpdateDisplayNameTask;
};

type TUpdateDisplayNameTask = {
  displayName: string;
  id: string;
};
