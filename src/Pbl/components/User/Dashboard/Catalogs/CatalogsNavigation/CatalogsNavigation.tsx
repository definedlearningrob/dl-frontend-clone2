import { Dispatch, SetStateAction } from 'react';

import { TCatalog } from '@pbl/graphql/user/queries/dashboardCatalog';
import UserDashboardStandardCatalogsCard from '@pbl/components/User/Dashboard/Catalogs/StandardCatalogCard/StandardCatalogCard';
import UserDashboardAllCatalogsCard from '@pbl/components/User/Dashboard/Catalogs/AllCatalogsCard/AllCatalogsCard';

import { CatalogCard } from '@shared/components/Catalog';

import styles from './CatalogsNavigation.module.sass';

type Props = {
  catalogs: TCatalog[];
  selectedCatalogData: TCatalog;
  setSelectedCatalogData: Dispatch<SetStateAction<TCatalog>>;
};

const CatalogsNavigation = ({ catalogs, selectedCatalogData, setSelectedCatalogData }: Props) => {
  if (catalogs.length === 1) {
    return (
      <nav>
        <CatalogCard catalog={catalogs[0]} />
      </nav>
    );
  }

  return (
    <div className='flex flex-col gap-base xxxl:gap-md'>
      <nav className={styles.userNavigation}>
        <UserDashboardAllCatalogsCard
          isSingleCard={false}
          selectedCatalogData={selectedCatalogData}
          setSelectedCatalogData={setSelectedCatalogData}
        />
        {catalogs.map((catalog) => (
          <UserDashboardStandardCatalogsCard
            key={catalog.id}
            catalog={catalog}
            isSingleCard={true}
            selectedCatalogData={selectedCatalogData}
            setSelectedCatalogData={setSelectedCatalogData}
          />
        ))}
      </nav>
      {selectedCatalogData?.id && (
        <CatalogCard key={selectedCatalogData.id} catalog={selectedCatalogData} />
      )}
    </div>
  );
};

export default CatalogsNavigation;
