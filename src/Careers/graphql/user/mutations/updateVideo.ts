import { gql } from '@apollo/client';

export default gql`
  mutation UpdateVideo($input: UpdateVideoMutationInput!) {
    updateVideo(input: $input) {
      video {
        description
        displayName
        filename
        name
        id
        url
      }
    }
  }
`;
