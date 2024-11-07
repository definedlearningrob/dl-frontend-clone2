import { gql } from '@apollo/client';

export default gql`
  mutation CreateExtensionFieldFile($input: CreateExtensionFieldFileMutationInput!) {
    createExtensionFieldFile(input: $input) {
      extensionFieldFile {
        filename
        id
        url
      }
    }
  }
`;

export type TCreateExtensionFieldFileMutationInput = {
  fileFilename: string;
  fileUuid: string;
  extensionFieldId: string;
};

export type TCreateExtensionFieldFileMutationData = {
  createExtensionFieldFile: {
    extensionFieldFile: TExtensionFieldFile;
  };
};

type TExtensionFieldFile = {
  filename: string;
  id: string;
  url: string;
};
