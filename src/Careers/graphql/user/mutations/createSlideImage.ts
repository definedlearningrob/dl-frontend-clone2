import { gql } from '@apollo/client';

export default gql`
  mutation CreateSlideImage($input: CreateSlideImageMutationInput!) {
    createSlideImage(input: $input) {
      slideImage {
        contentId
        id
        url
        style
        thumbnailUrl
      }
    }
  }
`;

export type TCreateSlideImageData = {
  createSlideImage: {
    slideImage: {
      id: string;
      contentId: string;
      url: string;
    };
  };
};

export type TCreateSlideImageVariables = {
  input: {
    imageFilename: string;
    imageUuid: string;
    contentId: string;
    slideId: string;
    position: string;
    style: 'fill' | 'contain';
  };
};
