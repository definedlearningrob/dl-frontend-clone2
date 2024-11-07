import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useToggle } from 'react-use';
import { useCareerReviewSurveyReportQuery } from '@graphql/dc/users/hooks';

import MainContent from '@dc/shared/MainContent/MainContent';
import { CareerReviewSummary } from '@dc/screens/UserApp/CareerReviewReport/CareerReviewSummary/CareerReviewSummary';
import { CareerReviewSurveyFullData } from '@dc/screens/UserApp/CareerReviewReport/CareerReviewSurveyTable/CareerReviewSurveyFullData';
import { CareerReviewSurveyFiltersModal } from '@dc/components/CareerReviewSurveyReport/CareerReviewSurveyFiltersModal';
import { useCareerReviewSurveyReportFilters } from '@dc/components/CareerReviewSurveyReport/useCareerReviewSurveyReportFilters';

import { ReactComponent as FilterIcon } from '@shared/svg/filter_outlined.svg';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import Button from '@shared/components/Button/Button';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';
import { FilterProvider } from '@shared/components/FilterProvider/FilterProvider';

import { AnswerDistribution } from './AnswerDistribution/AnswerDistribution';

export const CareerReviewSurveyReport = () => {
  const { t } = useTranslation();
  const { setBackNavButton } = useNavigation();

  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const [isFiltersModalOpen, toggleFiltersModalOpen] = useToggle(false);

  const { variables } = useCareerReviewSurveyReportFilters();

  const { data, loading, error } = useCareerReviewSurveyReportQuery({
    variables: { filter: variables.filter },
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    setBackNavButton(true);

    return () => setBackNavButton(false);
  }, []);

  if (error) {
    return <div className='text-center'>{t('common.messages.dataLoadingError')}</div>;
  }

  const careerReviewReport = data?.reports?.careerReviewSurveyReport;

  if (loading) {
    return (
      <section>
        <SkeletonRectangle
          className='!h-[562px] xxxl:!h-[642px]'
          color='standard'
          radius='sm'
          size='full-width'
        />
      </section>
    );
  }

  return (
    <MainContent>
      <div className='pb-xs mb-xs xxxl:mb-sm sticky top-lg z-high bg-neutral-200'>
        <div className='flex justify-between items-center'>
          <h4 className='text-base xxxl:text-lg mb-0'>
            {t('reports.reportName', {
              reportName: t('reports.reportTitle.careerReviewSurvey'),
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
        <CareerReviewSurveyFiltersModal
          isOpen={isFiltersModalOpen}
          onClose={toggleFiltersModalOpen}
        />
      </div>
      <div className='flex flex-col gap-base xxxl:gap-md'>
        <CareerReviewSummary studentsTotal={careerReviewReport?.studentsCount} />
        <AnswerDistribution
          isLoading={loading}
          questionAnswersCounts={careerReviewReport?.questionAnswerCounts}
          studentsAnsweredCount={careerReviewReport?.studentsAnsweredCount}
        />
        <FilterProvider initialFilters={{ fullNameOrSisIdCont: '', contextTypeIn: [] }}>
          <CareerReviewSurveyFullData />
        </FilterProvider>
      </div>
    </MainContent>
  );
};
