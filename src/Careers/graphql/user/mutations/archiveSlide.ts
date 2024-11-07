import { gql } from '@apollo/client';

export default gql`
  mutation ArchiveSlide($input: ArchiveSlideMutationInput!) {
    archiveSlide(input: $input) {
      slide {
        id
      }
    }
  }
`;

export type ArchiveSlideMutationInput = {
  input: {
    id: string;
  };
};

export type ArchiveSlideMutationData = {
  archiveSlide: {
    slide: {
      id: string;
    };
  };
};
