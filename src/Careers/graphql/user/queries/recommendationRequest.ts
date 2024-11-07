import { gql, TypedDocumentNode } from '@apollo/client';

import { CommonAppRequestData } from '@dc/screens/UserApp/CommonApp/CommonAppRequests/types';

export const RECOMMENDATION_REQUEST_QUERY: TypedDocumentNode<CommonAppRequestData, null> = gql`
  query RecommendationRequest($studentUuid: ID!) {
    recommendationRequest(studentUuid: $studentUuid) {
      applicant {
        applicantId
        email
        firstName
        lastName
        uuid
      }
      forms {
        formType
        status
        previewUrl
        deadline
      }
    }
  }
`;
