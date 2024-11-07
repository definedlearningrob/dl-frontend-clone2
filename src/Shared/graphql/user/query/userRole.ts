import { TypedDocumentNode, gql } from '@apollo/client';

export const USER_ROLE: TypedDocumentNode<UserRoleData, null> = gql`
  query UserRole {
    userInfo {
      username
      uuid
      role
    }
  }
`;

export type UserRoleData = {
  userInfo: {
    username: string;
    uuid: string;
    role: string;
  };
};
