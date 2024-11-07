import { ChangeEvent, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useBadgeFilters } from '@dc/components/Admin/BadgeManagement/BadgeFilters/BadgeFiltersProvider';

import { ReactComponent as SearchIcon } from '@shared/svg/search.svg';
import { TextInput } from '@shared/components/TextInput/TextInput';
import debounce from '@shared/utils/debounce';
const DEBOUNCE_TIME = 700;

export const BadgeFilter = () => {
  const { t } = useTranslation();
  const { setKeyword } = useBadgeFilters();

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
        placeholder={t('admin.badges.searchByBadgeName')}
        onChange={debouncedHandleChangeSearch}
      />
    </div>
  );
};
