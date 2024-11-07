import { useTranslation } from 'react-i18next';
import { useToggle, useUpdateEffect } from 'react-use';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { omit } from 'lodash-es';

import { AssessmentFiltersModal } from '@dc/components/AssessmentReport/AssessmentFiltersModal';
import { ASSESSMENT_REPORT } from '@dc/graphql/user/queries/reportsAssessmentReport';
import { useAssessmentReportFilters } from '@dc/components/AssessmentReport/useAssessmentReportFilters';
import { RecommendedPathways } from '@dc/screens/UserApp/AssessmentReport/RecommendedPathways/RecommendedPathways';
import { GENERATE_ASSESSMENT_REPORT } from '@dc/graphql/user/mutations/generateAssessmentReport';
import { ASSESSMENT_REPORT_FILE } from '@dc/graphql/user/queries/assessmentReport';

import Button from '@shared/components/Button/Button';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { ReactComponent as FilterIcon } from '@shared/svg/filter_outlined.svg';
import { ReactComponent as DownloadIcon } from '@shared/svg/download_to.svg';
import { MainContent } from '@shared/components/MainContent/MainContent';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import { useFileDownload } from '@shared/hooks/useFileDownload';
import { useReportGenerator } from '@shared/hooks/useReportGenerator';

import { AssessmentSummary } from './AssessmentSummary/AssessmentSummary';
import { ComponentResult } from './ComponentResult/ComponentResult';

export const AssessmentReport = () => {
  const { t } = useTranslation();
  const { setBackNavButton } = useNavigation();
  const { variables } = useAssessmentReportFilters();
  const { setFileToDownload, fileToDownload } = useFileDownload();
  const { generateReport, loading: isReportGenerating } = useReportGenerator();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const [isFiltersModalOpen, toggleFiltersModalOpen] = useToggle(false);

  const { data, loading, error } = useQuery(ASSESSMENT_REPORT, {
    variables,
    fetchPolicy: 'no-cache',
  });

  const setupFileToDownload = () => {
    setFileToDownload({
      mutation: GENERATE_ASSESSMENT_REPORT,
      query: ASSESSMENT_REPORT_FILE,
      variables: {
        ...omit(variables.filter, 'schoolYear'),
        startYear: variables.filter.schoolYear,
      },
    });
  };

  useEffect(() => {
    setBackNavButton(true);

    return () => setBackNavButton(false);
  }, []);

  useUpdateEffect(() => {
    if (fileToDownload?.mutation) {
      generateReport();
    }
  }, [fileToDownload?.mutation]);

  if (error) {
    return <div className='text-center'>{t('common.messages.dataLoadingError')}</div>;
  }

  const assessmentReport = data?.reports.assessmentReport;
  const shouldDisplayAssessmentCharts =
    loading || data!.reports.assessmentReport.summary.assessmentCompleted > 0;

  return (
    <MainContent>
      <div className='pb-xs mb-xs xxxl:mb-sm sticky top-lg z-high bg-neutral-200'>
        <div className='flex justify-between items-center'>
          <h4 className='text-base xxxl:text-lg mb-0'>
            {t('reports.reportName', {
              reportName: t('reports.reportTitle.assessment'),
            })}
          </h4>
          <div className='flex gap-sm'>
            <Button
              Icon={DownloadIcon}
              isLoading={isReportGenerating}
              size={isFullHD ? 'md' : 'sm'}
              variant='primary-outlined'
              onClick={setupFileToDownload}>
              {t('reports.generateReport')}
            </Button>
            <Button
              Icon={FilterIcon}
              size={isFullHD ? 'md' : 'sm'}
              variant='primary'
              onClick={toggleFiltersModalOpen}>
              {t('reports.changeFilters')}
            </Button>
          </div>
        </div>
        <AssessmentFiltersModal
          isOpen={isFiltersModalOpen}
          onClose={() => {
            toggleFiltersModalOpen(false);
            setFileToDownload(null);
          }}
        />
      </div>
      <div className='flex flex-col gap-base xxxl:gap-md'>
        <AssessmentSummary
          isLoading={loading}
          studentsTotal={assessmentReport?.studentsCount}
          summary={assessmentReport?.summary}
        />
        {shouldDisplayAssessmentCharts && (
          <ComponentResult
            highSchoolInterests={assessmentReport?.highSchoolInterests}
            highSchoolStudyPreferences={assessmentReport?.highSchoolStudyPreferences}
            highSchoolWorkValues={assessmentReport?.highSchoolWorkValues}
            isLoading={loading}
            middleSchoolInterests={assessmentReport?.middleSchoolInterests}
            middleSchoolStudyPreferences={assessmentReport?.middleSchoolStudyPreferences}
            middleSchoolWorkValues={assessmentReport?.middleSchoolWorkValues}
          />
        )}
        <RecommendedPathways
          clusterRecommendationCounts={assessmentReport?.clusterRecommendationCounts}
          isLoading={loading}
        />
      </div>
    </MainContent>
  );
};
