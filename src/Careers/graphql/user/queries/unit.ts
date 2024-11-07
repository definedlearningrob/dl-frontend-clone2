import { gql, TypedDocumentNode } from '@apollo/client';

import { ContentStatusesTypes, SERVICE_NAME, UnitResourceTypes } from '@shared/resources/enums';

export const UNIT: TypedDocumentNode<TUnitData, TUnitVariables> = gql`
  query Unit($id: ID!) {
    unit(id: $id) {
      archivedAt
      description
      displayName
      id
      imageUrl
      name
      status
      service
      tasks {
        id
        name
        step
        thumbnailUrl
        owner {
          name
          uuid
        }
      }
      resources {
        name
        resourceId
        resourceType
        step
        thumbnailUrl
        isVirtualInternship
      }
      thumbnailUrl
    }
  }
`;

export type TUnitResource = {
  name: string;
  resourceId: string;
  resourceType: UnitResourceTypes;
  step: number;
  thumbnailUrl: string;
};

export type TUnitTask = {
  id: string;
  name: string;
  step: number;
  owner: {
    name: string;
    uuid: string;
  } | null;
};

export type TUnit = {
  archivedAt: string;
  description: string;
  displayName: string;
  id: string;
  imageUrl: string;
  name: string;
  service: SERVICE_NAME;
  status: ContentStatusesTypes;
  resources: TUnitResource[];
  tasks: TUnitTask[];
  thumbnailUrl: string;
};

export type TUnitVariables = {
  id: string;
};

export type TUnitData = {
  unit: TUnit;
};
