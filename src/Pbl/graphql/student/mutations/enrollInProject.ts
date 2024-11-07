import { gql } from '@apollo/client';

export default gql`
  mutation EnrollInProject($input: EnrollInTaskMutationInput!) {
    enrollInProject: enrollInTask(input: $input) {
      status
    }
  }
`;

export type TEnrollStudentToProjectData = {
  enrollInProject: {
    status: string;
  };
};

export type TEnrollToProjectVariables = {
  input: {
    taskId: string;
    originatorId: string;
  };
};
