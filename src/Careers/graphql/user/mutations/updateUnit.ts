import { gql, TypedDocumentNode } from '@apollo/client';

import { TUnitTaskAttributes } from '@dc/graphql/user/mutations/createUnit';

export const UNIT_UPDATE: TypedDocumentNode<TUpdateUnitData, TUpdateUnitVariables> = gql`
  mutation UpdateUnit($input: UpdateUnitMutationInput!) {
    updateUnit(input: $input) {
      unit {
        archivedAt
        description
        displayName
        id
        imageUrl
        name
      }
    }
  }
`;

export type TUpdateUnitData = {
  updateUnit: {
    unit: {
      archivedAt: string;
      description: string;
      displayName: string;
      id: string;
      imageUrl: string;
      name: string;
    };
  };
};

export type TUpdateUnitVariables = {
  input: {
    id: string;
    description: string;
    displayName: string;
    imageUuid?: string;
    imageFilename?: string;
    name: string;
    status: string;
    unitTasks: TUnitTaskAttributes[];
    unitResources: { resourceType: string; resourceId: string }[];
  };
};
