import { gql } from '@apollo/client';

export default gql`
  query AdminUsers($uuid: ID!, $page: Int, $perPage: Int, $filter: UserFilter) {
    adminDashboard {
      entity(uuid: $uuid) {
        users(page: $page, perPage: $perPage, filter: $filter) {
          nodes {
            entity {
              name
              parent {
                name
                uuid
              }
              uuid
            }
            firstName
            gradingNeeded
            lastName
            role
            schoolClassesCount
            uuid
          }
          pagesCount
        }
        uuid
      }
      userId
    }
  }
`;
