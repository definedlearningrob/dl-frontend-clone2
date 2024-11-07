import { gql, TypedDocumentNode } from '@apollo/client';

import { SERVICE_NAME, UnitResourceTypes } from '@shared/resources/enums';

export const CREATE_UNIT: TypedDocumentNode<TCreateUnitData, TCreateUnitVariables> = gql`
  mutation CreateUnit($input: CreateUnitMutationInput!) {
    createUnit(input: $input) {
      unit {
        description
        displayName
        id
        imageUrl
        name
      }
    }
  }
`;

export type TUnitResourceAttributes = {
  resourceId: string;
  resourceType: UnitResourceTypes;
  step: number;
};

export type TUnitTaskAttributes = {
  step: number;
  taskId: string;
};

export type TCreateUnitData = {
  createUnit: {
    unit: {
      description: string;
      displayName: string;
      id: string;
      imageUrl: string;
      name: string;
    };
  };
};

export type TCreateUnitVariables = {
  input: {
    description: string;
    displayName: string;
    imageUuid?: string;
    imageFilename?: string;
    name: string;
    status: string;
    service: SERVICE_NAME;
    unitTasks: TUnitTaskAttributes[];
    unitResources: TUnitResourceAttributes[];
  };
};
