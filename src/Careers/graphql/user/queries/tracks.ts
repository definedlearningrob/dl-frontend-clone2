import { gql } from '@apollo/client';

import { ArchivableStatusTypes } from '@dc/resources/enums';

import { SERVICE_NAME } from '@shared/resources/enums';

export default gql`
  query Tracks($scope: ArchivableStatus, $filter: TrackFilter, $page: Int, $perPage: Int) {
    tracks(scope: $scope, filter: $filter, page: $page, perPage: $perPage) {
      nodesCount
      pagesCount
      nodes {
        archivedAt
        description
        displayName
        grades
        id
        imageUrl
        name
        shortDescription
        service
        status
        thumbnailUrl
        units {
          id
          imageUrl
          name
          step
          service
        }
      }
    }
  }
`;

export type TTracksData = {
  tracks: TTracks;
};

export enum TTrackStatuses {
  DRAFT,
  PUBLISHED,
}

export type TTracksFilterDetails = {
  nameCont: string;
  statusEq: TTrackStatuses;
  serviceEq: SERVICE_NAME;
};

export type TTracksVariables = {
  filter: TTracksFilterDetails;
  scope: ArchivableStatusTypes;
  page: number;
  perPage: number;
};

export type TTracks = {
  nodes: TTrack[];
  nodesCount: number;
  pagesCount: number;
};

export type TTrack = {
  archivedAt: string;
  description: string;
  displayName: string;
  grades: string[];
  id: string;
  imageUrl: string;
  name: string;
  service: string;
  shortDescription: string;
  status: string;
  thumbnailUrl: string;
  units: TUnit[];
};

export type TUnit = {
  id: string;
  imageUrl: string;
  name: string;
  step: number;
};
