import { gql } from '@apollo/client';

import { SERVICE_NAME } from '@shared/resources/enums';

export default gql`
  query Track($id: ID!) {
    track(id: $id) {
      archivedAt
      description
      displayName
      grades
      id
      imageUrl
      name
      shortDescription
      status
      service
      thumbnailUrl
      units {
        id
        imageUrl
        thumbnailUrl
        name
        step
        service
      }
    }
  }
`;

export type TUnit = {
  id: string;
  imageUrl: string;
  name: string;
  step: number;
};

export type TTrack = {
  archivedAt: string;
  description: string;
  displayName: string;
  grades: string[];
  id: string;
  imageUrl: string;
  name: string;
  shortDescription: string;
  status: string;
  service: SERVICE_NAME;
  thumbnailUrl: string;
  units: TUnit[];
};

export type TTrackVariables = {
  id: string;
};

export type TTrackData = {
  track: TTrack;
};
