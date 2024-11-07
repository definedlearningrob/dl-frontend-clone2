import { gql } from '@apollo/client';

import { EducationalSettingTypes, US_STATES } from '@dc/resources/enums';
import { TSyncStatus } from '@dc/resources/types';

export type TCounselor = {
  email: string;
  firstName: string;
  lastName: string;
  uuid: string;
};

export type TCommonAppData = {
  canSelectCounselor: boolean;
  canChangeCounselor: boolean;
  connectionUrl: string;
  hasAccountConnected: boolean;
  currentCounselor: TCounselor | null;
  hasCounselorInvited: boolean;
  hasFerpaSigned: boolean;
  syncStatus: TSyncStatus | null;
};

export type TStudentInfoSettings = {
  assessmentEnabled: boolean;
  assessmentType: EducationalSettingTypes;
  onboardingEnabled: boolean;
  selfEvaluationEnabled: boolean;
};

export type TStudentInfo = {
  currentSchoolYear: number;
  email: string;
  hasCompletedAssessment: boolean;
  hasCompletedOnboarding: boolean;
  hasUnreadConversation: boolean;
  hasAccessToPbl: boolean;
  firstName: string;
  isImpersonated: boolean;
  hasOpportunitiesEnabled: boolean;
  hasPlans: boolean;
  lastName: string;
  logoUrl: string;
  iconUrl: string;
  settings: TStudentInfoSettings;
  state: keyof typeof US_STATES;
  unreadAnnouncementsCount: number;
  postSecondaryApplicationsEnabled: boolean;
  unreadNotificationsCount: number;
  username: string;
  uuid: string;
  commonAppData: TCommonAppData;
  welcomeMessage: string;
};

export type TStudentInfoData = {
  userInfo: TStudentInfo;
};

export default gql`
  query DcStudentInfo {
    userInfo {
      settings {
        assessmentEnabled
        assessmentType
        onboardingEnabled
        selfEvaluationEnabled
      }
      commonAppData {
        canSelectCounselor
        hasCounselorInvited
        canChangeCounselor
        connectionUrl
        hasAccountConnected
        syncStatus {
          lastSyncedAt
          status
        }
        currentCounselor {
          email
          firstName
          lastName
          uuid
        }
        hasFerpaSigned
      }
      currentSchoolYear
      email
      hasCompletedAssessment
      hasCompletedOnboarding
      hasUnreadConversation
      hasOpportunitiesEnabled
      hasPlans
      postSecondaryApplicationsEnabled
      hasAccessToPbl
      firstName
      isImpersonated
      lastName
      logoUrl
      iconUrl
      state
      unreadAnnouncementsCount
      unreadNotificationsCount
      username
      uuid
      welcomeMessage
    }
  }
`;
