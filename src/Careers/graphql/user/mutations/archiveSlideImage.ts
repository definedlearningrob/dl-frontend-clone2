import { gql } from '@apollo/client';

export default gql`
  mutation ArchiveSlideImage($input: ArchiveSlideImageMutationInput!) {
    archiveSlideImage(input: $input) {
      slideImage {
        id
      }
    }
  }
`;

export type TArchiveSlideImageData = {
  archiveSlideImage: {
    slideImage: {
      id: string;
    };
  };
};

export type TArchiveSlideImageVariables = {
  input: {
    id: string;
  };
};
