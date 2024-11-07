import { BaseSyntheticEvent, useEffect, useMemo, useRef, useState } from 'react';
import { debounce, isEmpty } from 'lodash-es';
import { useTranslation } from 'react-i18next';
import { MultiValue } from 'react-select';
import { useField } from 'formik';

import { PartnerClusterSelectFilter } from '@dc/components/User/Partners/PartnerForm/PartnerCourses/PartnerClusterSelectFilter';
import { OPPORTUNITY_TYPE } from '@dc/resources/enums';
import useUserInfo from '@dc/hooks/useUserInfo';
import { usePartnerCustomFilters } from '@dc/components/User/Partners/PartnerForm/usePartnerCoursesFilters';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';

import { TextInput } from '@shared/components/TextInput/TextInput';
import { ReactComponent as SearchIcon } from '@shared/svg/search.svg';
import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import SharedSwitch from '@shared/components/Switch/Switch';
import { Select } from '@shared/components/Select';
import { Tooltip } from '@shared/components/Tooltip';
import { ROLES } from '@shared/resources/constants';

const DEBOUNCE_TIME = 500;
type FilterOption = { value: string; label: string };

export const PartnerOpportunitiesFilters = () => {
  const [entityField] = useField<string[]>('entityUuids');
  const [visibilityScopeField] = useField<string>('visibilityScope');

  const {
    userInfo: { role },
  } = useUserInfo<TUserInfo>();

  const { t } = useTranslation();
  const { filters, handleFilterChange } = usePartnerCustomFilters();
  const [isGlobal, setIsGlobal] = useState(filters.includeGlobal);
  const searchRef = useRef<HTMLInputElement>(null);
  const isSystemAdmin = role === ROLES.SYSTEM_ADMIN;

  const opportunityTypeOptions = Object.entries(OPPORTUNITY_TYPE).map(([key, value]) => ({
    label: t(`opportunities.types.${key}`, { defaultValue: t('opportunities.types.OTHER') }),
    value,
  }));

  const handleOnFilterChange = (event: BaseSyntheticEvent) => {
    handleFilterChange('nameCont', event.target.value);
  };

  const handleOnTypeChange = (typesCollection: MultiValue<FilterOption>) => {
    handleFilterChange(
      'typeIn',
      typesCollection.map((type) => type.value)
    );
  };
  const handleOnGlobalChange = () => {
    setIsGlobal((prev) => !prev);
    handleFilterChange('includeGlobal', !isGlobal);
  };
  const debouncedSearchChange = useMemo(() => debounce(handleOnFilterChange, DEBOUNCE_TIME), []);

  useEffect(() => {
    if (isSystemAdmin) {
      setIsGlobal(false);
      handleFilterChange('includeGlobal', true);
    }
    if (!isEmpty(entityField.value) || visibilityScopeField.value === 'ALL') {
      setIsGlobal(true);
      handleFilterChange('includeGlobal', true);
    }
  }, [isSystemAdmin, entityField.value]);

  const checkboxStyle = isSystemAdmin ? 'opacity-50' : '';

  return (
    <div className='flex flex-row gap-xs xxxl:gap-sm pb-sm xxxl:pb-base'>
      <div className='basis-1/3'>
        <TextInput
          Icon={SearchIcon}
          disabled={!isSystemAdmin && isEmpty(entityField.value)}
          forwardRef={searchRef}
          label={t('user.partners.filters.search')}
          placeholder={t('common.placeholders.searchFor', {
            field: t('common.fields.opportunities.opportunity').toLowerCase(),
          })}
          size='sm'
          onChange={debouncedSearchChange}
        />
      </div>
      <div className='basis-1/3'>
        <PartnerClusterSelectFilter filterType='pathwaysIdIn' isSystemAdmin={isSystemAdmin} />
      </div>
      <div className='basis-1/3'>
        <Select
          isDisabled={!isSystemAdmin && isEmpty(entityField.value)}
          isMulti={true}
          label={t('user.partners.type')}
          menuPortalTarget={document.body}
          name='typeIn'
          options={opportunityTypeOptions}
          size='sm'
          onChange={handleOnTypeChange}
        />
      </div>
      <div className='!w-[50px] flex flex-col gap-xxs items-start'>
        <Tooltip message={t('user.partners.filters.globalIconTooltip')}>
          <span className='text-xxs leading-lg flex gap-xxs text-neutral-400'>
            {t('user.partners.filters.global')}
            <IconContainer
              Icon={InfoIcon}
              className='text-neutral-400'
              paddingSize='none'
              size='sm'
            />
          </span>
        </Tooltip>
        <SharedSwitch
          className={checkboxStyle}
          disabled={isSystemAdmin}
          name='partnerGlobalEnabled'
          value={isGlobal}
          onChange={handleOnGlobalChange}
        />
      </div>
    </div>
  );
};
