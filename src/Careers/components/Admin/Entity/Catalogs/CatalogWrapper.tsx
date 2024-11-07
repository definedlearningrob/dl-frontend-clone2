import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import FilterProvider from '@dc/components/Admin/Lessons/Form/Items/Shared/FilterProvider/FilterProvider';
import catalogsQuery from '@dc/graphql/user/queries/catalogs';
import { CatalogListWrapper } from '@dc/components/Admin/Entity/Catalogs/CatalogListWrapper';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import { SERVICE_NAME } from '@shared/resources/enums';

type CatalogType = {
  label: string;
  value: SERVICE_NAME | null;
};

export const CatalogWrapper = () => {
  const { t } = useTranslation();

  const catalogTypeOptions = [
    { value: null, label: t('common.services.all') },
    { value: SERVICE_NAME.LEARNING, label: t('common.services.learning') },
    { value: SERVICE_NAME.CAREERS, label: t('common.services.careers') },
  ] as const;

  const [selectedCatalogType, setSelectedCatalogType] = useState<CatalogType>(
    catalogTypeOptions[0]
  );

  return (
    <FilterProvider omitUrl={true}>
      {({ SearchBar, filter }) => {
        const variables = useMemo(
          () => ({
            filter: selectedCatalogType.value
              ? { ...filter, serviceEq: selectedCatalogType.value }
              : filter,
          }),
          [selectedCatalogType, filter]
        );

        return (
          <SharedPaginatedLoader omitUrl={true} options={{ variables }} query={catalogsQuery}>
            {(props) => (
              <CatalogListWrapper
                SearchBar={SearchBar}
                pagingProps={props}
                selectedCatalogType={selectedCatalogType}
                setSelectedCatalogType={setSelectedCatalogType}
              />
            )}
          </SharedPaginatedLoader>
        );
      }}
    </FilterProvider>
  );
};
