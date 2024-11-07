import { gql } from '@apollo/client';

export default gql`
  mutation CreateStudentSubmission($input: CreateStudentSubmissionMutationInput!) {
    createProductSubmission: createStudentSubmission(input: $input) {
      productSubmission {
        id
      }
    }
  }
`;

export type CreateStudentSubmissionData = {
  createProductSubmission: {
    productSubmission: {
      id: string;
    };
  };
};

export type CreateStudentSubmissionVariables = {
  input: CreateStudentSubmissionMutationInput;
};

type CreateStudentSubmissionMutationInput = {
  productId: string;
  studentUuid: string;
  taskId: string;
};
