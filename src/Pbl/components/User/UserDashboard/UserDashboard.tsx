import { Redirect } from 'react-router';

import useUserInfo from '@pbl/hooks/useUserInfo';
import { TUserInfo } from '@pbl/graphql/user/queries/userInfo';
import { AdminDashboard } from '@pbl/components/User/AdminDashboard/AdminDashboard';
import { EntityDashboard } from '@pbl/components/User/EntityDashboard';
import { Roles } from '@pbl/resources/enums';
import SharedMainContent from '@pbl/shared/MainContent/MainContent';

const UserDashboard = () => {
  const { userInfo } = useUserInfo<TUserInfo>();

  if (!userInfo.role) {
    return <Redirect to='/' />;
  }

  const Dashboard = userInfo.role === Roles.SYSTEM_ADMIN ? AdminDashboard : EntityDashboard;

  return (
    <SharedMainContent>
      <Dashboard />
    </SharedMainContent>
  );
};

export default UserDashboard;
