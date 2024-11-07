import { gql } from '@apollo/client';

import { ASSET_TYPE, RESOURCE_CLASS } from '@shared/resources/enums';

export default gql`
  mutation GeneratePresignedUploadUrl($input: GeneratePresignedUploadUrlMutationInput!) {
    generatePresignedUploadUrl(input: $input) {
      url
      uuid
    }
  }
`;

export type GeneratePresignedUploadUrlData = {
  generatePresignedUploadUrl: {
    url: string;
    uuid: string;
  };
};

export type GeneratePresignedUploadUrlVariables = {
  input: GeneratePresignedUploadUrlMutationInput;
};

type GeneratePresignedUploadUrlMutationInput = {
  assetType: ASSET_TYPE;
  filename: string;
  resourceClass: RESOURCE_CLASS;
};
