import { gql } from '@apollo/client';

export default gql`
  mutation UnassignExtensionFieldToEntity($input: UnassignExtensionFieldFromEntityMutationInput!) {
    unassignExtensionFieldFromEntity(input: $input) {
      extensionField {
        id
      }
    }
  }
`;

export type TUnassignExtensionFieldFromEntityData = {
  assignExtensionFieldToEntity: {
    extensionField: {
      id: string;
    };
  };
};

export type TUnassignExtensionFieldFromEntityVariables = {
  input: {
    unassignFromHierarchy: boolean;
    extensionFieldId: string;
    entityUuid: string;
  };
};
