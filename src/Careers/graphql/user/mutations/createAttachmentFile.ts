import { gql } from '@apollo/client';

export default gql`
  mutation CreateAttachmentFile($input: CreateAttachmentFileMutationInput!) {
    createAttachmentFile(input: $input) {
      attachmentFile {
        id
      }
    }
  }
`;
