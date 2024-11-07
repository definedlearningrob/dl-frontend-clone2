import { Roles } from '@pbl/resources/enums';
import { TUserInfo } from '@pbl/graphql/user/queries/userInfo';
import useUserInfo from '@pbl/hooks/useUserInfo';

export const roleAllowed = (allowedRoles: Roles[]) => {
  const {
    userInfo: { role },
  } = useUserInfo<TUserInfo>();

  return allowedRoles.includes(role);
};
