import { gql } from '@apollo/client';

export const DASHBOARD_RECENT_RESOURCES_QUERY = gql`
  query DashboardRecentResources {
    dashboardRecentResources {
      resourceId
      resourceType
      name
      pathways {
        name
      }
      thumbnailUrl
      imageUrl
      collection {
        name
      }
      updatedAt
    }
  }
`;
