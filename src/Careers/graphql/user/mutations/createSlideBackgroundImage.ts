import { gql } from '@apollo/client';

export default gql`
  mutation CreateSlideBackgroundImage($input: CreateSlideBackgroundImageMutationInput!) {
    createSlideBackgroundImage(input: $input) {
      slideBackgroundImage {
        id
        thumbnailUrl
        url
      }
    }
  }
`;

export type TCreateSlideBackgroundImageData = {
  createSlideBackgroundImage: {
    slideBackgroundImage: {
      id: string;
      thumbnailUrl: string;
      url: string;
    };
  };
};

export type TCreateSlideBackgroundImageVariables = {
  input: {
    imageFilename: string;
    imageUuid: string;
    slideId: string;
  };
};
