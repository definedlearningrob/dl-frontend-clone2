import { gql } from '@apollo/client';

export default gql`
  mutation AssignStudentToProject($input: AssignStudentToTaskMutationInput!) {
    assignStudentToTask(input: $input) {
      status
    }
  }
`;

export type TAssignStudentsToProjectData = {
  assignStudentToTask: {
    status: string;
  };
};

export type TAssignStudentsToProjectVariables = {
  input: {
    studentUuids: string[];
    taskId: string;
  };
};
