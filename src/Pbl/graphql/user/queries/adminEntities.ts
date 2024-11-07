import { gql } from '@apollo/client';

export default gql`
  query AdminEntities($uuid: ID!, $page: Int, $perPage: Int, $filter: EntityFilter) {
    adminDashboard {
      entity(uuid: $uuid) {
        children(page: $page, perPage: $perPage, filter: $filter) {
          nodes {
            hierarchyMetrics {
              entitiesCount
              schoolClassesCount
              studentsCount
              teachersCount
            }
            name
            uuid
          }
          pagesCount
        }
        uuid
      }
    }
  }
`;
