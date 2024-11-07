import { useTranslation } from 'react-i18next';
import { useToggle } from 'react-use';
import { useEffect } from 'react';
import { useCareerExplorationReportSummaryQuery } from '@graphql/dc/users/hooks';

import { CareerExplorationFiltersModal } from '@dc/components/CareerPathwayReport/CareerExplorationFiltersModal';
import { CareerExplorationSummary } from '@dc/screens/UserApp/CareerPathwayReport/CareerExplorationSummary/CareerExplorationSummary';
import { CareerExplorationEngagement } from '@dc/screens/UserApp/CareerPathwayReport/CareerPathwayEngagementsChart/CareerExplorationEngagement';
import { useCareerExplorationReportFilters } from '@dc/components/CareerPathwayReport/useCareerExplorationReportFilters';
import { CareerExplorationFullData } from '@dc/screens/UserApp/CareerPathwayReport/CareerExplorationTable/CareerExplorationFullData';

import Button from '@shared/components/Button/Button';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { ReactComponent as FilterIcon } from '@shared/svg/filter_outlined.svg';
import { MainContent } from '@shared/components/MainContent/MainContent';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import Card from '@shared/components/Card/Card';
import { FilterProvider } from '@shared/components/FilterProvider/FilterProvider';

export const CareerExplorationReport = () => {
  const { t } = useTranslation();
  const { setBackNavButton } = useNavigation();
  const { variables } = useCareerExplorationReportFilters();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const [isFiltersModalOpen, toggleFiltersModalOpen] = useToggle(false);

  const {
    data: summaryData,
    loading,
    error,
  } = useCareerExplorationReportSummaryQuery({
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

  const summary = summaryData?.reports?.pathwayReport?.summary;

  return (
    <MainContent>
      <div className='pb-xs mb-xs xxxl:mb-sm sticky top-lg z-high bg-neutral-200'>
        <div className='flex justify-between items-center'>
          <h4 className='text-base xxxl:text-lg mb-0'>
            {t('reports.reportName', {
              reportName: t('reports.reportTitle.careerPathway'),
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
        <CareerExplorationFiltersModal
          isOpen={isFiltersModalOpen}
          onClose={() => {
            toggleFiltersModalOpen(false);
          }}
        />
      </div>
      <div className='flex flex-col gap-base xxxl:gap-md'>
        <Card>
          <CareerExplorationSummary
            isLoading={loading}
            studentsTotal={summary?.studentsCount}
            summary={summary}
          />
        </Card>
        <Card>
          <CareerExplorationEngagement />
        </Card>
        <Card>
          <FilterProvider initialFilters={{ fullNameOrSisIdCont: '', pathwayIdIn: [] }}>
            <CareerExplorationFullData />
          </FilterProvider>
        </Card>
      </div>
    </MainContent>
  );
};
