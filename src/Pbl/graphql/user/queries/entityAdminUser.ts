import { gql } from '@apollo/client';

export default gql`
  query SystemAdminUsers($uuid: ID!, $page: Int, $perPage: Int, $filter: UserFilter) {
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
    }
  }
`;

export type TSystemAdminUsers = {
  users: {
    nodes: {
      entity: {
        name: string;
        parent: {
          name: string;
          uuid: string;
        };
        uuid: string;
      };
      firstName: string;
      gradingNeeded: boolean;
      lastName: string;
      role: string;
      schoolClassesCount: number;
      uuid: string;
    };
    pageCount: number;
  };
};

export type SystemAdminUsersData = {
  systemAdminUsers: TSystemAdminUsers;
};

export type SystemAdminUsersVariables = {
  page: string;
  perPage: string;
  filter: string;
};
