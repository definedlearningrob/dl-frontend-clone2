import { useTranslation } from 'react-i18next';
import { ChangeEvent, useCallback } from 'react';
import { debounce } from 'lodash-es';
import { MultiValue } from 'react-select';

import { useCareerExplorationReportResultsFilters } from '@dc/screens/UserApp/CareerPathwayReport/CareerExplorationTable/useCareerExplorationReportResultsFilters';
import { ClustersSelect } from '@dc/shared/ClustersSelect/ClustersSelect';

import { TextInput } from '@shared/components/TextInput/TextInput';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { ReactComponent as SearchIcon } from '@shared/assets/icons/search.svg';

const DEBOUNCE_TIME = 700;

export const CareerExplorationTableFilters = () => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { t } = useTranslation();

  const { handleFilterChange } = useCareerExplorationReportResultsFilters();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFilterChange('fullNameOrSisIdCont', event.target.value);
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
        placeholder={t('careerExplorationReport.surveySearchPlaceholder')}
        size={isFullHD ? 'md' : 'sm'}
        onChange={debouncedSetFilter}
      />
      <ClustersSelect
        className='min-w-[240px]'
        label=''
        placeholder={t('careerExplorationReport.clustersPathwaysSelectPlaceholder')}
        size={isFullHD ? 'md' : 'sm'}
        onChange={handlePathwaysChange}
      />
    </div>
  );
};
