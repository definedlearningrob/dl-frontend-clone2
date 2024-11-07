import { gql } from '@apollo/client';

export default gql`
  mutation RestoreTrack($input: RestoreTrackMutationInput!) {
    restoreTrack(input: $input) {
      track {
        archivedAt
        id
      }
    }
  }
`;
