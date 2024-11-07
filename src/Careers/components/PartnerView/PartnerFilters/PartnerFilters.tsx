import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { PartnerIndexStatuses } from '@graphql/dc/users/types';
import { isEmpty, isNull } from 'lodash-es';

import { TUserInfo } from '@dc/graphql/user/queries/userInfo';
import useUserInfo from '@dc/hooks/useUserInfo';
import { usePartnerFilters } from '@dc/components/PartnerView/usePartnerFilters';
import { EntitiesSelect } from '@dc/components/EntitiesSelect/EntittiesSelect';

import { Select } from '@shared/components/Select';
import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';
import { ReactComponent as ClearIcon } from '@shared/svg/clear.svg';
import { ReactComponent as SearchIcon } from '@shared/svg/search.svg';
import { TextInput } from '@shared/components/TextInput/TextInput';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import SharedSwitch from '@shared/components/Switch/Switch';
import { Tooltip } from '@shared/components/Tooltip';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { ROLES } from '@shared/resources/constants';
import { cx } from '@shared/utils/cx';
import { IconButton } from '@shared/components/IconButton/IconButton';

type Props = {
  includeEntitiesFilter?: boolean;
};

export const PartnerFilters = ({ includeEntitiesFilter }: Props) => {
  const intersectionRef = useRef(null);
  const {
    filters,
    handleSearchChange,
    handleEntitiesChange,
    handleStatusChange,
    handleGlobalToggle,
    resetFilters,
  } = usePartnerFilters();

  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const {
    userInfo: {
      role,
      permissions: { wblAdmin },
    },
  } = useUserInfo<TUserInfo>();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const isSystemAdmin = role === ROLES.SYSTEM_ADMIN;
  const statusFilterEnabled = isSystemAdmin || wblAdmin;

  const filterSize = isFullHD ? 'md' : 'sm';

  const statusTypeOptions = Object.entries(PartnerIndexStatuses).map(([key, value]) => ({
    value: value,
    label: t(`user.partners.statusType.${key}`),
  }));

  const filterClasses = 'shrink basis-[220px] xxxl:basis-[380px]';

  const showClearAllFilterValuesAction =
    !isEmpty(inputRef?.current?.value) ||
    Object.values(filters).some((filterValue) => !isEmpty(filterValue)) ||
    !filters.includeGlobal;

  const clearAllFilters = () => {
    resetFilters();

    if (!isNull(inputRef)) {
      inputRef.current!.value = '';
    }
  };

  const entitiesValue =
    filters.entitiesUuidIn?.map((entityUuid, index) => ({
      label: filters.entitiesNames![index],
      value: entityUuid,
      children: [],
    })) ?? [];

  return (
    <div
      ref={intersectionRef}
      className='px-base py-sm rounded-t-sm top-[theme(variables.headerHeight)] transition-all duration-200 ease-in flex flex-col bg-white sticky z-lower'>
      <div className='flex items-end gap-sm xxxl:gap-base'>
        <div className='flex gap-xs xxxl:gap-sm grow'>
          <div className='shrink basis-[220px] xxxl:basis-[380px]'>
            <TextInput
              Icon={SearchIcon}
              defaultValue={filters.nameCont}
              forwardRef={inputRef}
              label={t('user.partners.search')}
              name='nameCont'
              placeholder={t('user.partners.searchPlaceholder')}
              size={filterSize}
              onChange={handleSearchChange}
            />
          </div>
          {statusFilterEnabled && (
            <div className={filterClasses}>
              <Select
                isMulti={true}
                label={t('user.partners.status')}
                menuPortalTarget={document.body}
                name='statusIn'
                options={[...statusTypeOptions]}
                placeholder={t('user.partners.statusPlaceholder')}
                size={filterSize}
                value={statusTypeOptions.filter((option) =>
                  filters.statusIn?.includes(option.value)
                )}
                onChange={handleStatusChange}
              />
            </div>
          )}
          {includeEntitiesFilter && (
            <div className={filterClasses}>
              <EntitiesSelect value={entitiesValue} onChange={handleEntitiesChange} />
            </div>
          )}
          <div className='shrink basis-[50px] flex flex-col gap-xxs xxxl:gap-xs justify-center'>
            <Tooltip message={t('user.partners.filters.globalIconTooltip')}>
              <span className='text-xxs leading-lg flex gap-xxs'>
                {t('user.partners.filters.global')}
                <IconContainer
                  Icon={InfoIcon}
                  className='text-neutral-400'
                  paddingSize='none'
                  size='sm'
                />
              </span>
            </Tooltip>
            <div className='h-full flex items-center'>
              <SharedSwitch
                name='partnerGlobalEnabled'
                value={filters.includeGlobal}
                onChange={handleGlobalToggle}
              />
            </div>
          </div>
          <div className={cx('flex items-end', { invisible: !showClearAllFilterValuesAction })}>
            <Tooltip message={t('common.actions.clearAll')}>
              <IconButton
                Icon={ClearIcon}
                aria-label={t('common.actions.clearAll')}
                size={isFullHD ? 'lg' : 'md'}
                variant='primary-outlined'
                onClick={clearAllFilters}
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};
