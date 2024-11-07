import { gql } from '@apollo/client';

export default gql`
  mutation CreateSlideVideo($input: CreateSlideVideoMutationInput!) {
    createSlideVideo(input: $input) {
      slideVideo {
        id
        contentId
        url
        videoUrl
        filename
      }
    }
  }
`;

export type TCreateSlideVideoData = {
  createSlideVideo: {
    slideVideo: {
      id: string;
      contentId: string;
      url: string;
      filename: string;
    };
  };
};

export type TCreateSlideVideoVariables = {
  input: {
    videoFilename?: string;
    videoUuid?: string;
    contentId: string;
    slideId: string;
    videoUrl?: string;
  };
};
