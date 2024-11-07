import { useMemo, useRef } from 'react';
import { GroupBase, MultiValue, SelectInstance } from 'react-select';
import { useTranslation } from 'react-i18next';

import { useCollections } from '@dc/graphql/shared/hooks/useCollections';
import { usePartnerCustomFilters } from '@dc/components/User/Partners/PartnerForm/usePartnerCoursesFilters';

import { Select } from '@shared/components/Select';

type FilterOption = { value: string; label: string };

type SelectElement<T extends unknown, IsMulti extends boolean> = SelectInstance<
  T,
  IsMulti,
  GroupBase<T>
>;

export const PartnerCollectionSelectFilter = () => {
  const { t } = useTranslation();
  const { data: collectionsData, loading: collectionsLoading } = useCollections();
  const collectionsSelectRef = useRef<SelectElement<FilterOption, true>>(null);
  const { handleFilterChange } = usePartnerCustomFilters();

  const collectionOptions = useMemo(
    () =>
      collectionsData?.collections.map((collection) => ({
        label: collection.name,
        value: collection.id,
      })) || [],
    [collectionsData]
  );

  const handleOnCollectionChange = (collections: MultiValue<FilterOption>) => {
    handleFilterChange(
      'collectionIdIn',
      collections.map((collection) => collection.value)
    );
  };

  return (
    <Select
      isLoading={collectionsLoading}
      isMulti={true}
      isSearchable={false}
      label={t('courses.filters.collection')}
      menuPortalTarget={document.body}
      name='collectionsSelect'
      options={collectionOptions}
      placeholder={t('common.actions.showAll')}
      selectRef={collectionsSelectRef}
      size='sm'
      onChange={handleOnCollectionChange}
    />
  );
};
