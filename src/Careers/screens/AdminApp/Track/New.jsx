import { useEffect } from 'react';

import AdminNewTrack from '@dc/components/Admin/Tracks/New/New';
import SharedMainContent from '@dc/shared/MainContent/MainContent';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';

function AdminTrackNew() {
  const { setBackNavButton } = useNavigation();

  useEffect(() => {
    setBackNavButton(true);

    return () => {
      setBackNavButton(false);
    };
  }, []);

  return (
    <SharedMainContent>
      <AdminNewTrack />
    </SharedMainContent>
  );
}

export default AdminTrackNew;
