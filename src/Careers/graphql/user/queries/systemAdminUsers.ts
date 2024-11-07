import { gql } from '@apollo/client';

import { Roles } from '@dc/resources/enums';

export default gql`
  query DcAdminUsers($page: Int, $perPage: Int, $filter: UserFilter) {
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
          gradingNeeded
          lastName
          role
          schoolClassesCount
          uuid
        }
        pagesCount
        nodesCount
      }
      userId
    }
  }
`;

export type TUserEntityParent = {
  name: string;
  uuid: string;
};

export type TUserEntity = {
  name: string;
  parent: TUserEntityParent;
  uuid: string;
};

export type TUser = {
  firstName: string;
  lastName: string;
  role: Roles;
  entity: TUserEntity;
  gradingNeeded: boolean;
  schoolClassesCount: number;
  uuid: string;
};

export type TUsers = {
  nodes: TUser[];
  nodesCount: number;
  pagesCount: number;
};

export type TAdminDashboardUsers = {
  users: TUsers;
};

export type TAdminDashboardData = {
  adminDashboard: TUsers;
};

export type TAdminDashboardUsersVariables = {
  page?: number;
  perPage?: number;
  filter?: { fullNameCont?: string };
};
