import { Dispatch, SetStateAction } from 'react';

import { TCatalog } from '@pbl/graphql/user/queries/dashboardCatalog';
import CatalogsNavigation from '@pbl/components/User/Dashboard/Catalogs/CatalogsNavigation/CatalogsNavigation';
import CatalogsSkeleton from '@pbl/components/User/Dashboard/Catalogs/Skeleton/CatalogsSkeleton';
import useDashboardCatalogs from '@pbl/graphql/user/hooks/useDashboardCatalogs';

import '@pbl/components/User/Dashboard/Catalogs/Catalogs.module.sass';
import styles from './Catalogs.module.sass';

type Props = {
  selectedCatalogData: TCatalog;
  setSelectedCatalogData: Dispatch<SetStateAction<TCatalog>>;
};

const UserDashboardCatalogs = ({ selectedCatalogData, setSelectedCatalogData }: Props) => {
  const { data, loading } = useDashboardCatalogs();

  if (loading || !data) {
    return (
      <div className={styles.userDashboardDescriptionCard}>
        <CatalogsSkeleton />
      </div>
    );
  }

  const { catalogs } = data;

  return (
    <CatalogsNavigation
      catalogs={catalogs.nodes}
      selectedCatalogData={selectedCatalogData}
      setSelectedCatalogData={setSelectedCatalogData}
    />
  );
};

export default UserDashboardCatalogs;
