import { Redirect } from 'react-router';

import EntityAdminView from '@dc/components/User/Dashboard/EntityAdminView/EntityAdminView';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import SystemAdminView from '@dc/components/User/Dashboard/SystemAdminView/SystemAdminView';
import TeacherView from '@dc/components/User/Dashboard/TeacherView/TeacherView';
import useUserInfo from '@dc/hooks/useUserInfo';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';
import { Roles } from '@dc/resources/enums';

function UserAppDashboard() {
  const { userInfo } = useUserInfo<TUserInfo>();

  if (!userInfo?.role) {
    return <Redirect to='/' />;
  }

  const renderCorrectDashboard = () =>
    ({
      [Roles.SALES_ADMIN]: <SystemAdminView />,
      [Roles.SYSTEM_ADMIN]: <SystemAdminView />,
      [Roles.ENTITY_ADMIN]: <EntityAdminView />,
      [Roles.TEACHER]: <TeacherView />,
    }[userInfo.role]);

  return (
    <SharedMainContent>
      <div className='user-app-dashboard'>{renderCorrectDashboard()}</div>
    </SharedMainContent>
  );
}

export default UserAppDashboard;
