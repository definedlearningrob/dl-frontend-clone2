import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import CatalogsEdit from '@dc/components/Admin/Catalogs/Edit/Edit';
import catalogQuery from '@dc/graphql/user/queries/catalog';
import type { TCatalogData, TCatalogVariables } from '@dc/graphql/user/queries/catalog';
import SharedMainContent from '@dc/shared/MainContent/MainContent';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

function AdminAppCatalogEdit() {
  const { id } = useParams<{ id: string }>();
  const { setBackNavButton } = useNavigation();

  useEffect(() => {
    setBackNavButton(true);

    return () => {
      setBackNavButton(false);
    };
  }, []);

  return (
    <SharedMainContent>
      <SharedDataLoader<TCatalogData, TCatalogVariables>
        options={{ fetchPolicy: 'network-only', variables: { id } }}
        query={catalogQuery}>
        {({ catalog }) => <CatalogsEdit catalog={catalog} />}
      </SharedDataLoader>
    </SharedMainContent>
  );
}

export default AdminAppCatalogEdit;
