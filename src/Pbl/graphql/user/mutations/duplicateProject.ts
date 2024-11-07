import { gql } from '@apollo/client';

export default gql`
  mutation DuplicateProject($input: DuplicateTaskMutationInput!) {
    duplicateTask(input: $input) {
      project: task {
        id
      }
    }
  }
`;

export type TDuplicateProjectData = {
  duplicateTask: {
    project: TDuplicateProjectTask;
  };
};

export type TDuplicateProjectVariables = {
  input: TDuplicateProjectTaskInput;
};

type TDuplicateProjectTask = {
  id: string;
};

type TDuplicateProjectTaskInput = {
  id: string;
  name: string;
  displayName: string;
};
