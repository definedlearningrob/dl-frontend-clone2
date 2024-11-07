import { gql } from '@apollo/client';

export default gql`
  mutation UpdateTrack($input: UpdateTrackMutationInput!) {
    updateTrack(input: $input) {
      track {
        id
      }
    }
  }
`;
