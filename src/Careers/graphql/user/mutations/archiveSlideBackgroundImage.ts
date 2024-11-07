import { gql } from '@apollo/client';

export default gql`
  mutation ArchiveSlideBackgroundImage($input: ArchiveSlideBackgroundImageMutationInput!) {
    archiveSlideBackgroundImage(input: $input) {
      slideBackgroundImage {
        id
      }
    }
  }
`;

export type TArchiveSlideBackgroundImageData = {
  archiveSlideBackgroundImage: {
    slideBackgroundImage: {
      id: string;
    };
  };
};

export type TArchiveSlideBackgroundImageVariables = {
  input: {
    id: string;
  };
};
