import { ChangeEvent, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useTagFilters } from '@dc/components/Admin/TagsManagement/TagsFilters/TagFiltersProvider';

import { ReactComponent as SearchIcon } from '@shared/svg/search.svg';
import { TextInput } from '@shared/components/TextInput/TextInput';
import debounce from '@shared/utils/debounce';
const DEBOUNCE_TIME = 700;

export const TagFilter = () => {
  const { t } = useTranslation();
  const { setKeyword } = useTagFilters();

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const debouncedHandleChangeSearch = useMemo(
    () => debounce(handleChangeSearch, DEBOUNCE_TIME),
    []
  );

  return (
    <div className='flex justify-end mb-base'>
      <TextInput
        Icon={SearchIcon}
        className='!w-[250px]'
        minLength={3}
        placeholder={t('common.placeholders.searchBy', {
          field: t('common.fields.common.name').toLowerCase(),
        })}
        onChange={debouncedHandleChangeSearch}
      />
    </div>
  );
};
