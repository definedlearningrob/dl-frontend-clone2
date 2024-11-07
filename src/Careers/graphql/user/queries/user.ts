import { gql } from '@apollo/client';

import { Roles } from '@dc/resources/enums';

export default gql`
  query User($uuid: ID!) {
    user(uuid: $uuid) {
      firstName
      lastName
      email
      permissions {
        wblAdmin
        counselor
        canImpersonate
        canBrowseReports
      }
      role
      uuid
    }
  }
`;

export type TUser = {
  firstName: string;
  lastName: string;
  email: string;
  permissions: TUserPermissions;
  role: Roles;
  uuid: string;
  fullName?: string;
};

export type TUserPermissions = {
  wblAdmin: boolean;
  counselor: boolean;
  canImpersonate: boolean;
  canBrowseReports: boolean;
};

export type TUserData = {
  user: TUser;
};

export type TUserVariables = {
  uuid: string;
};
