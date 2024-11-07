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

export type TGeneratePresignedUploadUrlMutationInput = {
  resourceClass: RESOURCE_CLASS;
  assetType: ASSET_TYPE;
  filename: string;
};

export type TGeneratePresignedUploadUrlMutationVariables = {
  variables: {
    input: TGeneratePresignedUploadUrlMutationInput;
  };
};

export type TGeneratePresignedUploadUrlData = {
  url: string;
  id: string;
};
