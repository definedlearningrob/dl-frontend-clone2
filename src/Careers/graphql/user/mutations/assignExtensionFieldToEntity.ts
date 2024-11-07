import { gql } from '@apollo/client';

export default gql`
  mutation AssignExtensionFieldToEntity($input: AssignExtensionFieldToEntityMutationInput!) {
    assignExtensionFieldToEntity(input: $input) {
      extensionField {
        id
      }
    }
  }
`;

export type TAssignExtensionFieldToEntityData = {
  assignExtensionFieldToEntity: {
    extensionField: {
      id: string;
    };
  };
};

export type TAssignExtensionFieldToEntityVariables = {
  input: {
    assignToHierarchy: boolean;
    extensionFieldId: string;
    entityUuid: string;
  };
};
