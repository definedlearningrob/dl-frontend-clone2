import { useTranslation } from 'react-i18next';
import { ChangeEvent, useCallback } from 'react';
import { debounce } from 'lodash-es';
import { MultiValue } from 'react-select';

import { ClustersSelect } from '@dc/shared/ClustersSelect/ClustersSelect';
import { useOpportunityReportResultsFilters } from '@dc/screens/UserApp/OpportunityReport/OpportunityTable/useOpportunityReportResultsFilters';

import { TextInput } from '@shared/components/TextInput/TextInput';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { ReactComponent as SearchIcon } from '@shared/assets/icons/search.svg';

const DEBOUNCE_TIME = 700;

export const OpportunityTableFilters = () => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { t } = useTranslation();

  const { handleFilterChange } = useOpportunityReportResultsFilters();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFilterChange('studentSearchableColumnsCont', event.target.value);
  };
  const debouncedSetFilter = useCallback(debounce(handleSearchChange, DEBOUNCE_TIME), []);

  const handlePathwaysChange = (pathways: MultiValue<{ label: string; value: string | number }>) =>
    handleFilterChange(
      'pathwayIdIn',
      pathways.map((pathway) => pathway.value.toString())
    );

  return (
    <div className='flex gap-sm items-center bg-neutral-200 px-sm py-xs xxxl:px-base xxxl:py-x rounded-t-sm'>
      <TextInput
        Icon={SearchIcon}
        className='!w-[300px] xxxl:!w-[320px]'
        iconPlacement='end'
        placeholder={t('opportunitiesReport.nameSearchPlaceholder')}
        size={isFullHD ? 'md' : 'sm'}
        onChange={debouncedSetFilter}
      />
      <ClustersSelect
        className='min-w-[240px]'
        label=''
        placeholder={t('opportunitiesReport.clustersPathwaysSelectPlaceholder')}
        size={isFullHD ? 'md' : 'sm'}
        onChange={handlePathwaysChange}
      />
    </div>
  );
};
