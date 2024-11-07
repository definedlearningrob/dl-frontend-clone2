import { BaseSyntheticEvent, useMemo, useRef } from 'react';
import { debounce } from 'lodash-es';
import { useTranslation } from 'react-i18next';

import { usePartnerCustomFilters } from '@dc/components/User/Partners/PartnerForm/usePartnerCoursesFilters';
import { PartnerClusterSelectFilter } from '@dc/components/User/Partners/PartnerForm/PartnerCourses/PartnerClusterSelectFilter';
import { PartnerCollectionSelectFilter } from '@dc/components/User/Partners/PartnerForm/PartnerCourses/PartnerCollectionSelectFilter';
import useUserInfo from '@dc/hooks/useUserInfo';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';

import { TextInput } from '@shared/components/TextInput/TextInput';
import { ReactComponent as SearchIcon } from '@shared/svg/search.svg';
import { ROLES } from '@shared/resources/constants';
const DEBOUNCE_TIME = 500;

export const PartnerCoursesFilters = () => {
  const { t } = useTranslation();
  const { handleFilterChange } = usePartnerCustomFilters();
  const searchRef = useRef<HTMLInputElement>(null);

  const {
    userInfo: { role },
  } = useUserInfo<TUserInfo>();

  const handleOnFilterChange = (event: BaseSyntheticEvent) => {
    handleFilterChange('nameCont', event.target.value);
  };

  const isSystemAdmin = role === ROLES.SYSTEM_ADMIN;
  const debouncedSearchChange = useMemo(() => debounce(handleOnFilterChange, DEBOUNCE_TIME), []);

  return (
    <div className='flex flex-row gap-xs xxxl:gap-sm pb-sm xxxl:pb-base'>
      <div className='basis-1/3'>
        <TextInput
          Icon={SearchIcon}
          forwardRef={searchRef}
          label={t('user.partners.filters.search')}
          placeholder={t('common.placeholders.searchFor', {
            field: t('common.fields.course.courses').toLowerCase(),
          })}
          size='sm'
          onChange={debouncedSearchChange}
        />
      </div>
      <div className='basis-1/3'>
        <PartnerClusterSelectFilter filterType='pathwayIdIn' isSystemAdmin={isSystemAdmin} />
      </div>
      <div className='basis-1/3'>
        <PartnerCollectionSelectFilter />
      </div>
    </div>
  );
};
