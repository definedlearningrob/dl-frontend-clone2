import { useEffect } from 'react';

import AdminNewUnit from '@dc/components/Admin/Units/New/New';
import SharedMainContent from '@dc/shared/MainContent/MainContent';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';

function AdminAppUnitNew() {
  const { setBackNavButton } = useNavigation();

  useEffect(() => {
    setBackNavButton(true);

    return () => {
      setBackNavButton(false);
    };
  }, []);

  return (
    <SharedMainContent>
      <AdminNewUnit />
    </SharedMainContent>
  );
}

export default AdminAppUnitNew;
