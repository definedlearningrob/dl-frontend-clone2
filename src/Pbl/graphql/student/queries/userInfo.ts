import { gql } from '@apollo/client';

export default gql`
  query DlStudentInfo {
    userInfo {
      currentSchoolYear
      hasAccessToCareers
      isImpersonated
      logoUrl
      iconUrl
      email
      hasPlans
      hasUnreadConversation
      unreadNotificationsCount
      firstName
      lastName
      definedLearningUuid
      standardSets {
        id
        name
        setId
      }
      username
      uuid
      settings {
        selfEvaluationEnabled
      }
      ltiDetails {
        isLti
        ltiContextId
        ltiConsumerKey
        ltiResourceLinkId
      }
      welcomeMessage
    }
  }
`;

export type TStudentInfoData = {
  userInfo: TStudentInfo;
};

export type TStudentInfo = {
  email: string;
  currentSchoolYear: number;
  firstName: string;
  lastName: string;
  standardSets: TStandardSet[];
  isImpersonated: boolean;
  hasUnreadConversation: boolean;
  hasAccessToCareers: boolean;
  hasPlans: boolean;
  unreadNotificationsCount: number;
  username: string;
  uuid: string;
  settings: TSettings;
  id: string;
  ltiDetails: TLtiDetails;
  logoUrl: string;
  iconUrl: string;
  definedLearningUuid: string;
  welcomeMessage: string;
};

export type TSettings = {
  selfEvaluationEnabled: boolean;
};

export type TStandardSet = {
  id: string;
  name: string;
  setId: string;
};

export type TLtiDetails = {
  isLti: boolean;
  isLtiSearch: boolean;
  ltiContextId: string;
  ltiConsumerKey: string;
  ltiResourceLinkId: string;
};
