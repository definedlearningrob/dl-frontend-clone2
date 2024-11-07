import { Redirect, Route, RouteProps } from 'react-router-dom';

import SharedRoleGuard from '@pbl/shared/RoleGuard/RoleGuard';
import { Roles } from '@pbl/resources/enums';

type Props = RouteProps & {
  allowedFor: Roles[];
  redirectTo?: string;
};

const GuardRoute = ({ allowedFor, redirectTo, ...rest }: Props) => (
  <SharedRoleGuard allowedFor={allowedFor} fallback={<Redirect to={redirectTo || '/'} />}>
    <Route {...rest} />
  </SharedRoleGuard>
);

export default GuardRoute;
