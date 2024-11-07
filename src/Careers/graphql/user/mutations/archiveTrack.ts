import { gql } from '@apollo/client';

export default gql`
  mutation ArchiveTrack($input: ArchiveTrackMutationInput!) {
    archiveTrack(input: $input) {
      track {
        archivedAt
        id
      }
    }
  }
`;
