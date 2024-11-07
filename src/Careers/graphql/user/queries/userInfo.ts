import { gql } from '@apollo/client';

import { Roles } from '@dc/resources/enums';
import { TSyncStatus } from '@dc/resources/types';

import { ReportType } from '@shared/resources/enums';

import { TUserPermissions } from './user';

type TUserInfoEntityNode = {
  uuid: string;
  settings: {
    postSecondaryApplicationsEnabled: boolean;
    classManagementEnabled: boolean;
    schoolYearStartDate: {
      day: number;
      month: number;
    };
  };
  reportTypes: ReportType[];
};

export type TCommonAppData = {
  hasRecommenderInvitation: boolean;
  hasTeacherInvitation: boolean;
  hasCounselorInvitation: boolean;
  hasCounselorProfileFormCompleted: boolean;
  hasTeacherProfileFormCompleted: boolean;
  syncStatus: TSyncStatus | null;
};

export type TUserInfo = {
  availableReportTypes: ReportType[];
  commonAppData: TCommonAppData;
  currentSchoolYear: number;
  email: string;
  logoUrl?: string;
  iconUrl?: string;
  entities: {
    nodes: TUserInfoEntityNode[];
  };
  firstName: string;
  hasUnreadConversation: boolean;
  hasOpportunitiesEnabled: boolean;
  hasAccessToPbl: boolean;
  lastName: string;
  isImpersonated: boolean;
  permissions: TUserPermissions;
  role: Roles;
  username: string;
  uuid: string;
  welcomeMessage: string;
};

export type TUserInfoData = {
  userInfo: TUserInfo;
};

export default gql`
  query DcUserInfo {
    userInfo {
      availableReportTypes
      email
      logoUrl
      iconUrl
      commonAppData {
        hasRecommenderInvitation
        hasTeacherInvitation
        hasCounselorInvitation
        hasCounselorProfileFormCompleted
        hasTeacherProfileFormCompleted
        syncStatus {
          lastSyncedAt
          status
        }
      }
      entities(page: 1, perPage: 1) {
        nodes {
          uuid
          settings {
            postSecondaryApplicationsEnabled
            classManagementEnabled
            schoolYearStartDate {
              day
              month
            }
          }
          reportTypes
        }
      }
      currentSchoolYear
      firstName
      hasUnreadConversation
      hasOpportunitiesEnabled
      hasAccessToPbl
      lastName
      isImpersonated
      permissions {
        wblAdmin
        counselor
        canImpersonate
        canBrowseReports
      }
      role
      username
      uuid
      welcomeMessage
    }
  }
`;
