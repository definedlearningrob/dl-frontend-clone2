import { useEffect } from 'react';

import SharedMainContent from '@dc/shared/MainContent/MainContent';
import TeacherView from '@dc/components/User/Dashboard/TeacherView/TeacherView';
import useExpandSidebar from '@dc/hooks/useExpandSidebar';
import { ROLES } from '@dc/resources/constants';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';

function UserAppEntityAdminTeacherDashboard() {
  const { activeDashboard } = useExpandSidebar();
  const { setBackNavButton } = useNavigation();

  useEffect(() => {
    if (activeDashboard.value === ROLES.ENTITY_ADMIN) setBackNavButton(true);

    return () => {
      setBackNavButton(false);
    };
  }, []);

  return (
    <SharedMainContent>
      <TeacherView />
    </SharedMainContent>
  );
}

export default UserAppEntityAdminTeacherDashboard;
