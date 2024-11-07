import { gql } from '@apollo/client';

export default gql`
  mutation UpdateIntroduction($input: UpdateTaskMutationInput!) {
    updateTask(input: $input) {
      project: task {
        id
        introduction
      }
    }
  }
`;

export type TUpdateIntroductionData = {
  updateTask: {
    project: TUpdateIntroductionTask;
  };
};

export type TUpdateIntroductionVariables = {
  input: TUpdateIntroductionTask;
};

type TUpdateIntroductionTask = {
  id: string;
  introduction: string;
};
