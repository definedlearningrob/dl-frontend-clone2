import { gql } from '@apollo/client';

export default gql`
  mutation CreateProductSubmissionFileFromGoogleDrive(
    $input: CreateProductSubmissionFileFromGoogleDriveMutationInput!
  ) {
    createProductSubmissionFileFromGoogleDrive(input: $input) {
      productSubmissionFile {
        filename
        googleWeblink
        id
        source
        url(options: { responseContentDisposition: "attachment" })
      }
    }
  }
`;

export type CreateProductSubmissionFileFromGoogleData = {
  createProductSubmissionFileFromGoogleDrive: {
    productSubmissionFile: {
      filename: string;
      googleWeblink: string;
      id: string;
      source: string;
      url: string;
    };
  };
};

export type CreateProductSubmissionFileFromGoogleVariables = {
  input: CreateProductSubmissionFileFromGoogleMutationInput;
};

type CreateProductSubmissionFileFromGoogleMutationInput = {
  accessToken: string;
  fileId: string;
  productSubmissionId: string;
};
