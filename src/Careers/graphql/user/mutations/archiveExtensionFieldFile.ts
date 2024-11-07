import { gql } from '@apollo/client';

export default gql`
  mutation ArchiveExtensionFieldFile($input: ArchiveExtensionFieldFileMutationInput!) {
    archiveExtensionFieldFile(input: $input) {
      extensionFieldFile {
        filename
        id
        url
      }
    }
  }
`;

export type TCreateExtensionFieldFileMutationInput = {
  input: {
    id: string;
  };
};

export type TCreateExtensionFieldFileMutationData = {
  archiveExtensionFieldFile: {
    extensionFieldFile: TExtensionFieldFile;
  };
};

type TExtensionFieldFile = {
  filename: string;
  id: string;
  url: string;
};
