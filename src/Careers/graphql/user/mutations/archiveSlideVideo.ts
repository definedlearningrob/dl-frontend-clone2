import { gql } from '@apollo/client';

export default gql`
  mutation ArchiveSlideVideo($input: ArchiveSlideVideoMutationInput!) {
    archiveSlideVideo(input: $input) {
      slideVideo {
        id
      }
    }
  }
`;

export type TArchiveSlidevideoData = {
  archiveSlideVideo: {
    slidevideo: {
      id: string;
    };
  };
};

export type TArchiveSlidevideoVariables = {
  input: {
    id: string;
  };
};
