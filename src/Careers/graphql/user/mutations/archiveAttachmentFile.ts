import { gql } from '@apollo/client';

export default gql`
  mutation ArchiveAttachmentFile($input: ArchiveAttachmentFileMutationInput!) {
    archiveAttachmentFile(input: $input) {
      attachmentFile {
        archivedAt
        id
      }
    }
  }
`;
