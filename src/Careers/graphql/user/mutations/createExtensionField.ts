import { gql } from '@apollo/client';

export default gql`
  mutation CreateExtension($input: CreateExtensionFieldMutationInput!) {
    createExtensionField(input: $input) {
      extensionField {
        id
        name
        description
      }
    }
  }
`;

export type TCreateExtensionFieldData = {
  createExtensionField: {
    extensionField: {
      id: string;
      name: string;
      description: string;
    };
  };
};

export type TCreateExtensionFieldVariables = {
  input: {
    name: string;
    description: string;
    status: string;
    imageUuid: string;
    imageFilename: string;
    link: TLink[];
  };
};

type TLink = {
  name: string;
  url: string;
};
