import { useTranslation } from 'react-i18next';
import { ChangeEvent, useMemo, useRef } from 'react';
import { SelectInstance, SingleValue } from 'react-select';
import { debounce, isEmpty } from 'lodash-es';

import { TextInput } from '@shared/components/TextInput/TextInput';
import { ReactComponent as SearchIcon } from '@shared/svg/search.svg';
import { ReactComponent as ClearIcon } from '@shared/svg/clear.svg';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { Tooltip } from '@shared/components/Tooltip';
import { IconButton } from '@shared/components/IconButton/IconButton';

import { useStatementResultsFilters } from './useStatementResultsFilters';
import { SelectOption, StatementStatusSelect } from './StatementStatusSelect';

export const PlanStatementResultsFilters = () => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { t } = useTranslation();
  const { handleFilterChange, resetFilters, filters } = useStatementResultsFilters();

  const searchRef = useRef<HTMLInputElement>(null);
  const statusSelectRef = useRef<SelectInstance<SelectOption>>(null);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFilterChange('fullNameOrSisIdCont', event.target.value);
  };

  const handleStatusChange = (status: SingleValue<SelectOption>) => {
    handleFilterChange('resultEq', status?.value ?? null);
  };

  const handleClearFilters = () => {
    resetFilters();

    if (searchRef.current) {
      searchRef.current.value = '';
    }
    statusSelectRef.current?.clearValue();
  };

  const debouncedSearchChange = useMemo(() => debounce(handleSearchChange, 300), []);

  const showClearButton = Object.values(filters).some((filterValue) => !isEmpty(filterValue));
  const inputSize = isFullHD ? 'md' : 'sm';
  const buttonSize = isFullHD ? 'lg' : 'md';

  return (
    <div className='flex gap-sm xxxl:gap-base bg-neutral-200 px-sm xxxl:px-base py-xs xxxl:py-x rounded-t-sm border border-neutral-300'>
      <div className='w-[240px] xxxl:w-[320px]'>
        <TextInput
          Icon={SearchIcon}
          forwardRef={searchRef}
          placeholder={t('planReport.statementResults.searchStudent')}
          size={inputSize}
          onChange={debouncedSearchChange}
        />
      </div>
      <div className='w-[160px] xxxl:w-[220px]'>
        <StatementStatusSelect
          placeholder={t('planReport.statementResults.selectStatus')}
          selectRef={statusSelectRef}
          size={inputSize}
          onChange={handleStatusChange}
        />
      </div>
      {showClearButton && (
        <Tooltip message={t('common.actions.clearAll')}>
          <IconButton
            Icon={ClearIcon}
            aria-label={t('common.actions.clearAll')}
            size={buttonSize}
            variant='primary-outlined'
            onClick={handleClearFilters}
          />
        </Tooltip>
      )}
    </div>
  );
};
