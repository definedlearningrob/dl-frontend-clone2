import { gql } from '@apollo/client';

import { Roles } from '@dc/resources/enums';

import { TUserPermissions } from '../queries/user';

export default gql`
  mutation UpdateUser($input: UpdateUserMutationInput!) {
    updateUser(input: $input) {
      user {
        uuid
        role
      }
    }
  }
`;

export type TUpdateUserResult = {
  user: {
    uuid: string;
    role: Roles;
  };
};

export type TUpdateUserVariables = {
  input: {
    uuid: string;
    role: Roles;
    permissions: TUserPermissions;
  };
};
