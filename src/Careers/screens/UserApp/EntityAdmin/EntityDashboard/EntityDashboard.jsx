import { useEffect } from 'react';

import EntityAdminView from '@dc/components/User/Dashboard/EntityAdminView/EntityAdminView';
import SharedMainContent from '@dc/shared/MainContent/MainContent';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';

function UserAppEntityAdminEntityDashboard() {
  const { setBackNavButton } = useNavigation();

  useEffect(() => {
    setBackNavButton(true);

    return () => {
      setBackNavButton(false);
    };
  }, []);

  return (
    <SharedMainContent>
      <EntityAdminView />
    </SharedMainContent>
  );
}

export default UserAppEntityAdminEntityDashboard;
