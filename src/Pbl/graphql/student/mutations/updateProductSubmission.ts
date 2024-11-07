import { gql } from '@apollo/client';

import { PRODUCT_SUBMISSION_STATUS } from '@pbl/resources/enums';

export default gql`
  mutation UpdateProductSubmission($input: UpdateProductSubmissionMutationInput!) {
    updateProductSubmission(input: $input) {
      productSubmission {
        id
        status
      }
    }
  }
`;

export type UpdateProductSubmissionData = {
  updateProductSubmission: {
    productSubmission: {
      id: string;
      status: string;
    };
  };
};

export type UpdateProductSubmissionVariables = {
  input: UpdateProductSubmissionMutationInput;
};

type UpdateProductSubmissionMutationInput = {
  id: string;
  status: PRODUCT_SUBMISSION_STATUS;
};
