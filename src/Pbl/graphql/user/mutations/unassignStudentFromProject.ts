import { gql } from '@apollo/client';

export default gql`
  mutation UnassignStudentFromProject($input: UnassignStudentFromTaskMutationInput!) {
    unassignStudentFromTask(input: $input) {
      status
    }
  }
`;

export type TUnassignStudentsFromProjectData = {
  unassignStudentFromTask: {
    status: string;
  };
};

export type TUnassignStudentsFromProjectVariables = {
  input: {
    studentUuids: string[];
    taskId: string;
  };
};
