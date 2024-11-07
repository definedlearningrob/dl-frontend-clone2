import { gql } from '@apollo/client';

export default gql`
  query SystemAdminEntities($page: Int, $perPage: Int, $filter: EntityFilter) {
    adminDashboard {
      entities(page: $page, perPage: $perPage, filter: $filter) {
        nodes {
          hierarchyMetrics {
            entitiesCount
            schoolClassesCount
            studentsCount
            teachersCount
          }
          name
          settings {
            assessmentType
          }
          uuid
        }
        pagesCount
      }
      userId
    }
  }
`;
