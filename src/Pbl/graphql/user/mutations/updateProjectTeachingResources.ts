import { gql } from '@apollo/client';

export default gql`
  mutation UpdateTeacherResources($input: UpdateTaskMutationInput!) {
    updateTask(input: $input) {
      project: task {
        id
        teachingResources
      }
    }
  }
`;

export type TUpdateTeachingResourcesData = {
  updateTask: {
    project: TUpdateProjectTeachingTask;
  };
};

export type TUpdateTeachingResourcesVariables = {
  input: TUpdateProjectTeachingTask;
};

type TUpdateProjectTeachingTask = {
  id: string;
  teachingResources: string;
};
