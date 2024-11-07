import { useEffect } from 'react';

import CatalogsNew from '@dc/components/Admin/Catalogs/New/New';
import SharedMainContent from '@dc/shared/MainContent/MainContent';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';

function AdminAppCatalogNew() {
  const { setBackNavButton } = useNavigation();

  useEffect(() => {
    setBackNavButton(true);

    return () => {
      setBackNavButton(false);
    };
  }, []);

  return (
    <SharedMainContent>
      <CatalogsNew />
    </SharedMainContent>
  );
}

export default AdminAppCatalogNew;
