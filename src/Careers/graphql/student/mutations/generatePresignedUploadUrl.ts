import { gql } from '@apollo/client';

export default gql`
  mutation GeneratePresignedUploadUrl($input: GeneratePresignedUploadUrlMutationInput!) {
    generatePresignedUploadUrl(input: $input) {
      url
      uuid
    }
  }
`;
