import { gql } from '@apollo/client';

export default gql`
  mutation ArchiveVideo($input: ArchiveVideoMutationInput!) {
    archiveVideo(input: $input) {
      video {
        archivedAt
        id
      }
    }
  }
`;
