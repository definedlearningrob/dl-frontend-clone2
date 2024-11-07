import { gql } from '@apollo/client';

export default gql`
  mutation CreateTeamSubmission($input: CreateTeamSubmissionMutationInput!) {
    createProductSubmission: createTeamSubmission(input: $input) {
      productSubmission {
        id
      }
    }
  }
`;

export type CreateTeamSubmissionData = {
  createProductSubmission: {
    productSubmission: {
      id: string;
    };
  };
};

export type CreateTeamSubmissionVariables = {
  input: CreateTeamSubmissionMutationInput;
};

type CreateTeamSubmissionMutationInput = {
  productId: string;
  teamUuid: string;
  taskId: string;
};
