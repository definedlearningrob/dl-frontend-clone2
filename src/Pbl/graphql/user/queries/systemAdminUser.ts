import { gql } from '@apollo/client';

export default gql`
  query DlAdminUsers($page: Int, $perPage: Int, $filter: UserFilter) {
    adminDashboard {
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
          lastName
          role
          schoolClassesCount
          uuid
        }
        pagesCount
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
