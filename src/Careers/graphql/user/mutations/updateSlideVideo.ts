import { gql } from '@apollo/client';

export default gql`
  mutation UpdateSlideVideo($input: UpdateSlideVideoMutationInput!) {
    updateSlideVideo(input: $input) {
      slideVideo {
        id
        videoUrl
        url
        contentId
      }
    }
  }
`;

export type TUpdateSlideVideoData = {
  slideVideo: {
    id: string;
    url: string;
    contentId: string;
    videoUrl: string;
  };
};

export type TUpdateSlideVideoVariables = {
  input: {
    id: string;
    videoUrl: string;
  };
};
