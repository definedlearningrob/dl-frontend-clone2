import { gql } from '@apollo/client';

export default gql`
  mutation UpdateStudentResources($input: UpdateTaskMutationInput!) {
    updateTask(input: $input) {
      project: task {
        id
        studentResources
      }
    }
  }
`;

export type TUpdateStudentResourcesData = {
  updateTask: {
    project: TUpdateStudentResourcesTask;
  };
};

export type TUpdateStudentResourcesVariables = {
  input: TUpdateStudentResourcesTask;
};

type TUpdateStudentResourcesTask = {
  id: string;
  studentResources: string;
};
