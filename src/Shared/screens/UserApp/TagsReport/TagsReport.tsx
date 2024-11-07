import { useToggle } from 'react-use';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash-es';
import { useHistory } from 'react-router-dom';

import { MainContent } from '@shared/components/MainContent/MainContent';
import { TagDetails } from '@shared/screens/UserApp/TagsReport/TagDetails/TagDetails';
import { TagsSummary } from '@shared/screens/UserApp/TagsReport/TagsSummary/TagsSummary';
import { FiltersModal } from '@shared/components/TagsReport';
import { TagsTable } from '@shared/screens/UserApp/TagsReport/TagsTable/TagsTable';
import Button from '@shared/components/Button/Button';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { ReactComponent as FilterIcon } from '@shared/svg/filter_outlined.svg';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import { useTagsReportFilters } from '@shared/components/TagsReport/useTagsReportFilters';
import { REPORT_PATHS } from '@shared/resources/constants';

type Props = {
  schoolYearStartDate: { day: number; month: number };
};

export const TagsReport = ({ schoolYearStartDate }: Props) => {
  const { t } = useTranslation();
  const history = useHistory();

  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const [isFiltersModalOpen, toggleFiltersModalOpen] = useToggle(false);
  const [studentsTotal, setStudentsTotal] = useState(0);

  const { setBackNavButton } = useNavigation();
  const { filters } = useTagsReportFilters();

  const hasTags = !isEmpty(filters.tags);

  useEffect(() => {
    if (!hasTags) {
      history.replace(`/reports/${REPORT_PATHS.GOAL_PERFORMANCE_INDICATORS}/filters`);
    }

    setBackNavButton(true);

    return () => setBackNavButton(false);
  }, []);

  return (
    <MainContent>
      <div className='flex justify-between items-center mb-sm sticky top-lg bg-neutral-200 z-higher py-xs'>
        <h4 className='mb-0 text-base xxxl:text-lg'>
          {t('reports.goalsReport', {
            reportName: t('reports.reportTitle.goalPerformanceIndicators'),
          })}
        </h4>
        <Button
          Icon={FilterIcon}
          size={isFullHD ? 'md' : 'sm'}
          variant='primary'
          onClick={toggleFiltersModalOpen}>
          {t('reports.changeFilters')}
        </Button>
      </div>
      <div className='flex flex-col gap-base xxxl:gap-md'>
        <TagsSummary studentsTotal={studentsTotal} />
        <TagDetails />
        <TagsTable onDataLoad={setStudentsTotal} />
      </div>
      <FiltersModal
        isOpen={isFiltersModalOpen}
        schoolYearStartDate={schoolYearStartDate}
        onClose={() => toggleFiltersModalOpen(false)}
      />
    </MainContent>
  );
};
