import { gql } from '@apollo/client';

export default gql`
  mutation ArchiveExtensionField($input: ArchiveExtensionFieldMutationInput!) {
    archiveExtensionField(input: $input) {
      extensionField {
        id
      }
    }
  }
`;

export type TArchiveExtensionFieldData = {
  archiveExtensionField: {
    extensionField: {
      id: string;
    };
  };
};

export type TArchiveExtensionFieldVariables = {
  input: {
    id: string;
  };
};
