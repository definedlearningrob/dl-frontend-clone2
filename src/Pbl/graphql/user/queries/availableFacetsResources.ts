import { gql } from '@apollo/client';

export default gql`
  query AvailableFacetsResources {
    userInfo {
      availableResources {
        catalogs {
          displayName
        }
        tracks {
          displayName
        }
        units {
          displayName
        }
      }
      uuid
    }
  }
`;

export type TAvailableFacetsResource = {
  displayName: string;
};

export type TAvailableFacetsResources = {
  catalogs: TAvailableFacetsResource[];
  tracks: TAvailableFacetsResource[];
  units: TAvailableFacetsResource[];
};

export type TAvailableFacetsResourcesUserInfo = {
  uuid: string;
  availableResources: TAvailableFacetsResources;
};

export type TAvailableFacetsResourcesData = {
  userInfo: TAvailableFacetsResourcesUserInfo;
};
