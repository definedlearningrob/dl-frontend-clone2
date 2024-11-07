import { gql } from '@apollo/client';

export default gql`
  mutation CreateProductSubmission($input: CreateProductSubmissionMutationInput!) {
    createProductSubmission(input: $input) {
      productSubmission {
        id
        status
      }
    }
  }
`;

export type CreateProductSubmissionData = {
  createProductSubmission: {
    productSubmission: {
      id: string;
      status: string;
    };
  };
};

export type CreateProductSubmissionVariables = {
  input: CreateProductSubmissionMutationInput;
};

type CreateProductSubmissionMutationInput = {
  productId: string;
  taskId: string;
  teamId?: string;
};
