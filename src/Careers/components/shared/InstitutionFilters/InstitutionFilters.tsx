import React, { ChangeEvent, useEffect, useMemo, useRef } from 'react';
import { debounce } from 'lodash-es';
import { useHistory } from 'react-router-dom';
import { SelectInstance, GroupBase } from 'react-select';
import { useTranslation } from 'react-i18next';
import { useUpdateEffect } from 'react-use';
import cx from 'classnames';

import { ReactComponent as CommonAppLogo } from '@dc/svg/CommonApp.svg';
import useUserInfo from '@dc/hooks/useUserInfo';
import { TStudentInfo } from '@dc/graphql/student/queries/userInfo';
import { US_STATES } from '@dc/resources/enums';
import {
  InstitutionCostRangeOption,
  InstitutionSizeOption,
  LocationSelectOption,
  TypeSelectOption,
  useInstitutionFilters,
} from '@dc/shared/InstitutionFiltersProvider';

import { TextInput } from '@shared/components/TextInput/TextInput';
import { ReactComponent as ClearIcon } from '@shared/svg/clear.svg';
import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';
import { ReactComponent as SearchIcon } from '@shared/svg/search.svg';
import { Tooltip } from '@shared/components/Tooltip';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import Switch from '@shared/components/Switch/Switch';
import SharedIcon from '@shared/components/Icon/Icon';
import { Select } from '@shared/components/Select';

import { costsOptions, DEFAULT_DEBOUNCE_TIME, locations, types, getSizesOptions } from './helpers';

type InstitutionFiltersProps = {
  debounceTime?: number;
  triggerType?: 'CLICK' | 'CHANGE';
  showAdditionalFilters?: boolean;
};

type RefType<T> = SelectInstance<T, true, GroupBase<T>> | null;

export const InstitutionFilters = ({
  debounceTime = DEFAULT_DEBOUNCE_TIME,
  triggerType = 'CLICK',
  showAdditionalFilters = false,
}: InstitutionFiltersProps) => {
  const {
    filters,
    setKeyword,
    setLocation,
    setType,
    resetAllFilters,
    setApplicationsType,
    setSize,
    setCost,
    filtersAsQuery,
    isAnyFiltersApplied,
  } = useInstitutionFilters();
  const { t } = useTranslation();
  const sizesOptions = getSizesOptions();

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const isAutomaticSubmissionEnabled = triggerType === 'CHANGE';
  const debouncedHandleChangeSearch = useMemo(() => debounce(handleChangeSearch, debounceTime), []);
  const { userInfo } = useUserInfo<TStudentInfo>();

  useEffect(() => {
    if (!isAutomaticSubmissionEnabled) {
      setLocation([{ value: userInfo.state, label: US_STATES[userInfo.state] }]);
    }

    return debouncedHandleChangeSearch.cancel;
  }, []);

  const history = useHistory();

  useUpdateEffect(() => {
    if (isAutomaticSubmissionEnabled) {
      const locationObj = { search: filtersAsQuery };
      history.push(locationObj);
    }
  }, [filtersAsQuery]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const locationRef = useRef<RefType<LocationSelectOption>>(null);
  const typeRef = useRef<RefType<TypeSelectOption>>(null);
  const sizeRef = useRef<RefType<InstitutionSizeOption>>(null);
  const costsRef = useRef<RefType<InstitutionCostRangeOption>>(null);

  const handleClearAllFilters = () => {
    resetAllFilters();

    if (inputRef?.current?.value) {
      inputRef.current.value = '';
    }

    locationRef.current?.setValue([], 'deselect-option', undefined);
    typeRef.current?.setValue([], 'deselect-option', undefined);
    sizeRef.current?.setValue([], 'deselect-option', undefined);
    costsRef.current?.setValue([], 'deselect-option', undefined);
  };

  return (
    <div className='flex items-start gap-sm xxxl:gap-base flex-grow'>
      <div className='basis-[240px] shrink-0 flex flex-col gap-xs'>
        <label
          className='flex items-center text-xs gap-xxs leading-lg text-font-secondary'
          htmlFor='search'>
          {t('student.institutionSearch.filters.search')}
          <Tooltip message={t('student.institutionSearch.filters.inputTooltip')}>
            <IconContainer
              Icon={InfoIcon}
              className='text-neutral-400'
              paddingSize='none'
              size='sm'
            />
          </Tooltip>
        </label>
        <TextInput
          Icon={SearchIcon}
          defaultValue={filters.searchableColumnsCont}
          forwardRef={inputRef}
          iconPlacement='end'
          id='search'
          placeholder={t('student.institutionSearch.filters.searchPlaceholder')}
          onChange={debouncedHandleChangeSearch}
        />
      </div>
      <div className='flex-grow basis-1/4 min-w-0'>
        <Select
          defaultValue={locations.filter(({ value }) => filters.stateIn?.includes(value))}
          isMulti={true}
          label={t('student.institutionSearch.filters.location')}
          name='location'
          options={locations}
          placeholder={t('student.institutionSearch.filters.location')}
          selectRef={locationRef}
          onChange={setLocation}
        />
      </div>
      <div className='flex-grow basis-1/4 min-w-0'>
        <Select
          defaultValue={types.filter(({ value }) => filters.typeIn?.includes(value))}
          isMulti={true}
          label={t('student.institutionSearch.filters.type')}
          name='type'
          options={types}
          placeholder={t('student.institutionSearch.filters.type')}
          selectRef={typeRef}
          onChange={setType}
        />
      </div>
      {showAdditionalFilters && (
        <>
          <div className='flex-grow basis-1/4 min-w-0'>
            <Select
              defaultValue={sizesOptions.filter(({ value }) => filters.sizeTypeIn?.includes(value))}
              isMulti={true}
              label={t('student.institutionSearch.filters.size')}
              name='size'
              options={sizesOptions}
              placeholder={t('student.institutionSearch.filters.size')}
              selectRef={sizeRef}
              onChange={setSize}
            />
          </div>
          <div className='flex-grow basis-1/4 min-w-0'>
            <Select
              defaultValue={costsOptions.filter(({ value }) => filters.costRange?.includes(value))}
              isMulti={true}
              label={t('student.institutionSearch.filters.costs')}
              name='costs'
              options={costsOptions}
              placeholder={t('student.institutionSearch.filters.costs')}
              selectRef={costsRef}
              onChange={setCost}
            />
          </div>
          <div className='flex-grow shrink-0 basis-[125px] min-w-0'>
            <label
              className='text-font-secondary text-xs leading-sm flex mb-xs'
              htmlFor='commonAppEnabledEq'>
              <div className='me-xs'>{t('student.institutionSearch.filters.commonApp')}</div>
              <Tooltip message={t('student.institutionSearch.filters.commonAppFilterInfo')}>
                <IconContainer
                  Icon={InfoIcon}
                  className='text-neutral-400'
                  paddingSize='none'
                  size='sm'
                />
              </Tooltip>
            </label>
            <div className='flex gap-xs py-xs'>
              <SharedIcon className='h-base' icon={<CommonAppLogo />} />
              <Switch
                className='h-base'
                inputId='commonAppEnabledEq'
                value={!!filters.commonAppEnabledEq}
                onChange={(event) => setApplicationsType(event.target.checked)}
              />
            </div>
          </div>
        </>
      )}
      {isAutomaticSubmissionEnabled && (
        <div className='mt-base self-center'>
          <Tooltip disabled={!isAnyFiltersApplied} message={t('opportunities.clearAll')}>
            <DeprecatedIconButton
              aria-label={t('common.actions.clearAll')}
              className={cx({ invisible: !isAnyFiltersApplied })}
              icon={<ClearIcon />}
              size='sm'
              square={true}
              variant='primary'
              onClick={handleClearAllFilters}
            />
          </Tooltip>
        </div>
      )}
    </div>
  );
};
