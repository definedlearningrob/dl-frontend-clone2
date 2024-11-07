import { gql } from '@apollo/client';

import { Roles } from '@pbl/resources/enums';

import { ReportType } from '@shared/resources/enums';

export default gql`
  query DlUserInfo {
    userInfo {
      availableTasksCount
      availableTracksCount
      availableReportTypes
      algoliaSearchKey
      currentSchoolYear
      hasAccessToCareers
      logoUrl
      iconUrl
      permissions {
        canBrowseReports
      }
      hasUnreadConversation
      entities(page: 1, perPage: 1) {
        nodes {
          settings {
            classManagementEnabled
            schoolYearStartDate {
              day
              month
            }
          }
          uuid
        }
      }
      highlightedCatalogs {
        name
        id
      }
      email
      firstName
      lastName
      role
      standardSets {
        id
        name
        setId
      }
      username
      uuid
      id
      definedLearningUuid
      ltiDetails {
        isLti
        isLtiSearch
        ltiContextId
        ltiConsumerKey
        ltiResourceLinkId
      }
      welcomeMessage
    }
  }
`;

export type TUserInfoData = {
  userInfo: TUserInfo;
};

type TUserInfoEntityNode = {
  uuid: string;
  settings: {
    classManagementEnabled: boolean;
    schoolYearStartDate: {
      day: number;
      month: number;
    };
  };
  reportTypes: ReportType[];
};

export type TUserPermissions = {
  canBrowseReports: boolean;
};

export type TUserInfo = {
  availableReportTypes: ReportType[];
  availableTasksCount: number;
  availableTracksCount: number;
  algoliaSearchKey: string;
  currentSchoolYear: number;
  logoUrl: string;
  iconUrl: string;
  entities: {
    nodes: TUserInfoEntityNode[];
  };
  isSystemAdmin: boolean;
  email: string;
  firstName: string;
  hasAccessToCareers: boolean;
  hasUnreadConversation: boolean;
  highlightedCatalogs: THighlightedCatalogOption[];
  lastName: string;
  permissions: TUserPermissions;
  role: Roles;
  standardSets: TStandardSet[];
  username: string;
  uuid: string;
  id: string;
  ltiDetails: TLtiDetails;
  definedLearningUuid: string;
  welcomeMessage: string;
};

export type TStandardSet = {
  id: string;
  name: string;
  setId: string;
};

export type THighlightedCatalogOption = {
  name: string;
  id: string;
};

export type TLtiDetails = {
  isLti: boolean;
  isLtiSearch: boolean;
  ltiContextId: string;
  ltiConsumerKey: string;
  ltiResourceLinkId: string;
};
