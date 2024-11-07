import { gql } from '@apollo/client';

export default gql`
  mutation CreateVideo($input: CreateVideoMutationInput!) {
    createVideo(input: $input) {
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
