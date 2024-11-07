import { gql } from '@apollo/client';

export default gql`
  mutation UpdateExtensionFieldStatus($input: UpdateExtensionFieldMutationInput!) {
    updateExtensionField(input: $input) {
      extensionField {
        id
        status
      }
    }
  }
`;

export type TUpdateExtensionData = {
  updateExtensionField: {
    extensionsField: TExtensionField;
  };
};

export type TUpdateExtensionVariables = {
  input: {
    id: string;
    status: TExtensionStatus;
  };
};

type TExtensionField = {
  id: string;
  status: TExtensionStatus;
};

type TExtensionStatus = 'PUBLISHED' | 'DRAFT';
