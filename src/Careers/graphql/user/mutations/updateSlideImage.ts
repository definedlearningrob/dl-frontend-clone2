import { gql } from '@apollo/client';

export default gql`
  mutation UpdateSlideImage($input: UpdateSlideImageMutationInput!) {
    updateSlideImage(input: $input) {
      slideImage {
        id
        style
        url
        contentId
        position
      }
    }
  }
`;

export type TUpdateSlideImageData = {
  slideImage: {
    id: string;
    style: string;
    url: string;
    contentId: string;
    position: string;
  };
};

export type TUpdateSlideImageVariables = {
  input: {
    id: string;
    style?: 'fill' | 'contain';
    position?: string;
  };
};
