import { ReactElement, ReactNode } from 'react';

import useUserInfo from '@dc/hooks/useUserInfo';
import { Roles } from '@dc/resources/enums';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';

type TRoleGuardProps = { allowedFor: Roles[]; children: ReactNode; fallback?: ReactElement };
type TRoleGuardEntityAdminProps = { children: ReactNode };
type TRoleGuardTeacherProps = { children: ReactNode };
type TRoleGuardSystemAdminProps = { children: ReactNode };

function SharedRoleGuard({ allowedFor = [], children }: TRoleGuardProps) {
  const userInfoHook = useUserInfo();
  const userInfo = userInfoHook.userInfo as TUserInfo;
  const haveAccess = userInfo.role ? allowedFor.includes(userInfo.role) : false;

  return haveAccess ? <>{children}</> : null;
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

export default SharedRoleGuard;
