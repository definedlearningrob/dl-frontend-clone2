import { gql } from '@apollo/client';

export default gql`
  mutation DeleteProductSubmissionFile($input: DeleteProductSubmissionFileMutationInput!) {
    deleteProductSubmissionFile(input: $input) {
      status
      productSubmission {
        id
        productId
        grade {
          pointsScored
          pointsAvailable
          updatedAt
        }
        files {
          id
        }
      }
    }
  }
`;

export type DeleteProductSubmissionFileData = {
  deleteProductSubmissionFile: {
    status: string;
    productSubmission: {
      id: string;
      productId: string;
      grade: TProductSubmisisonGrade;
      files: {
        id: string;
      }[];
    };
  };
};

export type DeleteProductSubmissionFileVariables = {
  input: {
    id: string;
  };
};

type TProductSubmisisonGrade = {
  updatedAt: string;
  pointsAvailable: number;
  pointsScored: number;
};
