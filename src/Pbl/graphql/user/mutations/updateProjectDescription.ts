import { gql } from '@apollo/client';

export default gql`
  mutation UpdateProjectDescription($input: UpdateTaskMutationInput!) {
    updateTask(input: $input) {
      project: task {
        id
        description
      }
    }
  }
`;

export type TUpdateDescriptionData = {
  updateTask: {
    project: TUpdateDescriptionTask;
  };
};

export type TUpdateDescriptionVariables = {
  input: TUpdateDescriptionTask;
};

type TUpdateDescriptionTask = {
  description: string;
  id: string;
};
