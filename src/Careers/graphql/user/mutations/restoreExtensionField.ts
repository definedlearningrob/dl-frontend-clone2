import { gql } from '@apollo/client';

export default gql`
  mutation RestoreExtensionField($input: RestoreExtensionFieldMutationInput!) {
    restoreExtensionField(input: $input) {
      extensionField {
        archivedAt
        id
      }
    }
  }
`;

export type TRestoreExtensionFieldData = {
  unarchiveExtensionField: {
    extensionField: {
      archivedAt: string;
      id: string;
    };
  };
};

export type TRestoreExtensionFieldVariables = {
  input: {
    id: string;
  };
};
