import { PropsWithChildren, ReactElement } from 'react';

import useUserInfo from '@pbl/hooks/useUserInfo';
import { Roles } from '@pbl/resources/enums';
import { TUserInfo } from '@pbl/graphql/user/queries/userInfo';

type TRoleGuardProps = PropsWithChildren<{ allowedFor: Roles[]; fallback?: ReactElement }>;
type TRoleGuardEntityAdminProps = PropsWithChildren<{}>;
type TRoleGuardTeacherProps = PropsWithChildren<{}>;
type TRoleGuardSystemAdminProps = PropsWithChildren<{}>;

function SharedRoleGuard({ allowedFor = [], children, fallback }: TRoleGuardProps) {
  const userInfoHook = useUserInfo();
  const userInfo = userInfoHook.userInfo as TUserInfo;
  const haveAccess = userInfo.role ? allowedFor.includes(userInfo.role) : false;

  return haveAccess ? <>{children}</> : fallback || null;
}

SharedRoleGuard.SystemAdmin = function ({ children }: TRoleGuardSystemAdminProps) {
  return <SharedRoleGuard allowedFor={[Roles.SYSTEM_ADMIN]}>{children}</SharedRoleGuard>;
};

SharedRoleGuard.SalesAdmin = function ({ children }: TRoleGuardSystemAdminProps) {
  return (
    <SharedRoleGuard allowedFor={[Roles.SYSTEM_ADMIN, Roles.SALES_ADMIN]}>
      {children}
    </SharedRoleGuard>
  );
};

SharedRoleGuard.EntityAdmin = function ({ children }: TRoleGuardEntityAdminProps) {
  return (
    <SharedRoleGuard allowedFor={[Roles.SALES_ADMIN, Roles.SYSTEM_ADMIN, Roles.ENTITY_ADMIN]}>
      {children}
    </SharedRoleGuard>
  );
};

SharedRoleGuard.Teacher = function ({ children }: TRoleGuardTeacherProps) {
  return (
    <SharedRoleGuard
      allowedFor={[Roles.SALES_ADMIN, Roles.SYSTEM_ADMIN, Roles.ENTITY_ADMIN, Roles.TEACHER]}>
      {children}
    </SharedRoleGuard>
  );
};

SharedRoleGuard.Educator = ({ children }: TRoleGuardTeacherProps) => (
  <SharedRoleGuard allowedFor={[Roles.SYSTEM_ADMIN, Roles.ENTITY_ADMIN, Roles.TEACHER]}>
    {children}
  </SharedRoleGuard>
);
export default SharedRoleGuard;
