import { gql } from '@apollo/client';

import { TStudentInfo } from '../queries/userInfo';

export default gql`
  mutation UpdateCommonAppMetadata($input: UpdateCommonAppMetadataMutationInput!) {
    updateCommonAppMetadata(input: $input) {
      userInfo {
        settings {
          assessmentEnabled
          assessmentType
          onboardingEnabled
          selfEvaluationEnabled
        }
        commonAppData {
          connectionUrl
          hasAccountConnected
          hasFerpaSigned
        }
        email
        hasCompletedAssessment
        hasCompletedOnboarding
        hasUnreadConversation
        hasAccessToPbl
        firstName
        isImpersonated
        lastName
        state
        unreadAnnouncementsCount
        unreadNotificationsCount
        username
        uuid
      }
    }
  }
`;

export type TUpdateCommonAppMetadataData = {
  updateCommonAppMetadata: {
    userInfo: TStudentInfo;
  };
};

export type TUpdateCommonAppMetadataVariables = {
  input: {
    commonAppMetadataAttributes: {
      applicantId: number;
    };
  };
};
