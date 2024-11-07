import { gql, TypedDocumentNode } from '@apollo/client';

import { CommonAppRequestsData } from '@dc/screens/UserApp/CommonApp/CommonAppRequests/types';

export const RECOMMENDATION_REQUESTS_QUERY: TypedDocumentNode<CommonAppRequestsData, null> = gql`
  query RecommendationRequests($page: Int, $perPage: Int) {
    recommendationRequests(page: $page, perPage: $perPage) {
      nodes {
        applicant {
          applicantId
          email
          firstName
          lastName
          uuid
        }
        deadline
        submittedFormsCount
        totalFormsCount
      }
      nodesCount
      pagesCount
    }
  }
`;
