import { gql } from '@apollo/client';

export default gql`
  mutation CreateTrack($input: CreateTrackMutationInput!) {
    createTrack(input: $input) {
      track {
        id
      }
    }
  }
`;
