import useUserInfo from '@dc/hooks/useUserInfo';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';
import { TStudentInfo } from '@dc/graphql/student/queries/userInfo';

import { Roles } from '@shared/resources/enums';

export const useCanManagePartner = () => {
  const { userInfo } = useUserInfo<TUserInfo | TStudentInfo>();

  if (!('permissions' in userInfo)) return false;

  const isWBLAdmin = userInfo.permissions.wblAdmin;
  const isSystemAdmin = userInfo?.role === Roles.SYSTEM_ADMIN;

  return isWBLAdmin || isSystemAdmin;
};
