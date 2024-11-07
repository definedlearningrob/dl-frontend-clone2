import { gql } from '@apollo/client';

export default gql`
  mutation ArchiveAttachment($input: ArchiveAttachmentMutationInput!) {
    archiveAttachment(input: $input) {
      attachment {
        archivedAt
        id
      }
    }
  }
`;
