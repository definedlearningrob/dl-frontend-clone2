import { gql } from '@apollo/client';

export default gql`
  mutation CreateProductSubmissionFile($input: CreateProductSubmissionFileMutationInput!) {
    createProductSubmissionFile(input: $input) {
      productSubmissionFile {
        filename
        id
        source
        url(options: { responseContentDisposition: "attachment" })
      }
    }
  }
`;

export type CreateProductSubmissionFileData = {
  createProductSubmissionFile: {
    productSubmissionFile: {
      filename: string;
      id: string;
      source: string;
      url: string;
    };
  };
};

export type CreateProductSubmissionFileVariables = {
  input: CreateProductSubmissionFileMutationInput;
};

type CreateProductSubmissionFileMutationInput = {
  fileFilename: string;
  fileUuid: string;
  productSubmissionId: string;
};
