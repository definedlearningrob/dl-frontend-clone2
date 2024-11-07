import { gql } from '@apollo/client';

import { ArchivableStatusTypes } from '@dc/resources/enums';
import { ContentStatusesTypes } from '@dc/resources/enums';

import { SERVICE_NAME } from '@shared/resources/enums';

export default gql`
  query Catalogs($scope: ArchivableStatus, $filter: CatalogFilter, $page: Int, $perPage: Int) {
    catalogs(scope: $scope, filter: $filter, page: $page, perPage: $perPage) {
      nodesCount
      pagesCount
      nodes {
        archivedAt
        description
        displayName
        id
        imageUrl
        name
        status
        service
        thumbnailUrl
        tracks {
          id
          imageUrl
          name
          step
          service
          units {
            id
            name
            step
          }
        }
      }
    }
  }
`;

export type TCatalogTrack = {
  id: string;
  imageUrl: string;
  name: string;
  step: number;
};

export type TCatalog = {
  archivedAt: string;
  description: string;
  displayName: string;
  id: string;
  imageUrl: string;
  name: string;
  status: ContentStatusesTypes;
  service: SERVICE_NAME;
  thumbnailUrl: string;
  tracks: TCatalogTrack[];
};

export type TCatalogs = {
  nodesCount: number;
  pagesCount: number;
  nodes: TCatalog[];
};

export type TCatalogsFilter = {
  nameCont: string;
  serviceEq: SERVICE_NAME;
  statusEq: ContentStatusesTypes;
};

export type TCatalogsVariables = {
  scope: ArchivableStatusTypes;
  filter: TCatalogsFilter;
  page?: number;
  perPage?: number;
};

export type TCatalogsData = {
  catalogs: TCatalogs;
};
