import { gql, TypedDocumentNode } from '@apollo/client';

import { ArchivableStatusTypes } from '@dc/resources/enums';

import { ContentStatusesTypes, SERVICE_NAME } from '@shared/resources/enums';

export const UNITS: TypedDocumentNode<TUnitsData, TUnitsVariables> = gql`
  query Units($scope: ArchivableStatus, $filter: UnitFilter, $page: Int, $perPage: Int) {
    units(scope: $scope, filter: $filter, page: $page, perPage: $perPage) {
      nodes {
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
        }
        thumbnailUrl
      }
      nodesCount
      pagesCount
    }
  }
`;

export type TUnitTask = {
  id: string;
  name: string;
  step: number;
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
  tasks: TUnitTask[];
  thumbnailUrl: string;
};

export type TUnits = {
  nodes: TUnit[];
  nodesCount: number;
  pagesCount: number;
};

export type TUnitsFilterDetails = {
  nameCont: string;
  statusEq: ContentStatusesTypes;
  serviceEq: SERVICE_NAME;
};

export type TUnitsVariables = {
  filter?: TUnitsFilterDetails;
  scope?: ArchivableStatusTypes;
  page?: number;
  perPage?: number;
};

export type TUnitsData = {
  units: TUnits;
};
