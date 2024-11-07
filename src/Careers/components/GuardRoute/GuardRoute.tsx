import { Redirect, Route, RouteProps } from 'react-router-dom';

import SharedRoleGuard from '@dc/shared/RoleGuard/RoleGuard';
import { Roles } from '@dc/resources/enums';

type Props = RouteProps & {
  allowedFor: Roles[];
  redirectTo?: string;
};

export const GuardRoute = ({ allowedFor, redirectTo, ...rest }: Props) => (
  <SharedRoleGuard allowedFor={allowedFor} fallback={<Redirect to={redirectTo || '/'} />}>
    <Route {...rest} />
  </SharedRoleGuard>
);
