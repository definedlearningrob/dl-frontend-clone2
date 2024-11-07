import { useTranslation } from 'react-i18next';
import { useToggle } from 'react-use';
import { useEffect } from 'react';
import { useOpportunityReportSummaryQuery } from '@graphql/dc/users/hooks';

import { useOpportunityReportFilters } from '@dc/components/OpportunityReport/useOpportunityReportFilters';
import { OpportunityFiltersModal } from '@dc/components/OpportunityReport/OpportunityFiltersModal';
import { OpportunitySummary } from '@dc/screens/UserApp/OpportunityReport/OpportunitySummary/OpportunitySummary';
import { OpportunityReportApplicationsCount } from '@dc/screens/UserApp/OpportunityReport/OpportunityReportApplicationsCountChart/OpportunityReportApplicationsCount';
import { OpportunityReportTypesCount } from '@dc/screens/UserApp/OpportunityReport/OpportunityReportTypesCount/OpportunityReportTypesCount';
import { OpportunityFullData } from '@dc/screens/UserApp/OpportunityReport/OpportunityTable/OpportunityFullData';

import Button from '@shared/components/Button/Button';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { ReactComponent as FilterIcon } from '@shared/svg/filter_outlined.svg';
import { MainContent } from '@shared/components/MainContent/MainContent';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import Card from '@shared/components/Card/Card';
import { FilterProvider } from '@shared/components/FilterProvider/FilterProvider';

export const OpportunityReport = () => {
  const { t } = useTranslation();
  const { setBackNavButton } = useNavigation();
  const { variables } = useOpportunityReportFilters();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const [isFiltersModalOpen, toggleFiltersModalOpen] = useToggle(false);

  const { data, loading, error } = useOpportunityReportSummaryQuery({
    variables,
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    setBackNavButton(true);

    return () => setBackNavButton(false);
  }, []);

  if (error) {
    return <div className='text-center'>{t('common.messages.dataLoadingError')}</div>;
  }

  return (
    <MainContent>
      <div className='pb-xs mb-xs xxxl:mb-sm sticky top-lg z-high bg-neutral-200'>
        <div className='flex justify-between items-center'>
          <h4 className='text-base xxxl:text-lg mb-0'>
            {t('reports.reportName', {
              reportName: t('reports.reportTitle.opportunities'),
            })}
          </h4>
          <div className='flex gap-sm'>
            <Button
              Icon={FilterIcon}
              size={isFullHD ? 'md' : 'sm'}
              variant='primary'
              onClick={toggleFiltersModalOpen}>
              {t('reports.changeFilters')}
            </Button>
          </div>
        </div>
        <OpportunityFiltersModal
          isOpen={isFiltersModalOpen}
          onClose={() => {
            toggleFiltersModalOpen(false);
          }}
        />
      </div>
      <div className='flex flex-col gap-base xxxl:gap-md'>
        <Card>
          <OpportunitySummary
            isLoading={loading}
            studentsTotal={data?.reports?.opportunityReport?.studentsCount}
            summary={data?.reports?.opportunityReport?.summary}
          />
        </Card>
        <Card>
          <OpportunityReportTypesCount />
        </Card>
        <Card>
          <OpportunityReportApplicationsCount />
        </Card>
        <Card>
          <FilterProvider initialFilters={{ studentSearchableColumnsCont: '', pathwayIdIn: [] }}>
            <OpportunityFullData />
          </FilterProvider>
        </Card>
      </div>
    </MainContent>
  );
};
