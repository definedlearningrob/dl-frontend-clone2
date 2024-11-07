import { gql } from '@apollo/client';

import { ArchivableStatusTypes } from '@dc/resources/enums';

import { SERVICE_NAME } from '@shared/resources/enums';

export default gql`
  query Catalog($id: ID!) {
    catalog(id: $id) {
      description
      displayName
      id
      imageUrl
      name
      status
      thumbnailUrl
      service
      tracks {
        id
        imageUrl
        name
        step
        service
        units {
          id
          name
        }
      }
    }
  }
`;

export type TCatalogTrackUnit = {
  id: string;
  name: string;
};

export type TCatalogTrack = {
  id: string;
  imageUrl: string;
  name: string;
  step: number;
  service: SERVICE_NAME;
  units: TCatalogTrackUnit[];
};

export type TCatalog = {
  description: string;
  displayName: string;
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  name: string;
  service: SERVICE_NAME;
  status: ArchivableStatusTypes;
  tracks: TCatalogTrack[];
};

export type TCatalogData = {
  catalog: TCatalog;
};

export type TCatalogVariables = {
  id: string;
};
