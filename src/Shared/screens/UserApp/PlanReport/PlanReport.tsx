import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useToggle, useUpdateEffect } from 'react-use';
import { isEmpty } from 'lodash-es';
import { useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import SharedMainContent from '@dc/shared/MainContent/MainContent';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import Button from '@shared/components/Button/Button';
import { ReactComponent as DownloadIcon } from '@shared/svg/download_to.svg';
import { ReactComponent as FilterIcon } from '@shared/svg/filter_outlined.svg';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { useFileDownload } from '@shared/hooks/useFileDownload';
import { useReportGenerator } from '@shared/hooks/useReportGenerator';
import { usePlanReportFilters } from '@shared/components/PlanReport/usePlanReportFilters';
import { PlanGroupsStatistics, PlanReportFiltersModal } from '@shared/components/PlanReport';
import { PlanStatementReport } from '@shared/components/PlanReport/PlanStatementReport/PlanStatementReport';
import { PLAN_REPORT } from '@shared/graphql/user/query/planReport';
import { REPORT_PATHS } from '@shared/resources/constants';
import { GENERATE_GOAL_PLAN_REPORT } from '@shared/graphql/user/mutations/generateGoalPlanReport';
import { GOAL_PLANS_REPORT } from '@shared/graphql/user/query/goalPlansReport';

import { Summary } from './Summary';

type Props = {
  schoolYearStartDate: { day: number; month: number };
};

export const PlanReport = ({ schoolYearStartDate }: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { t } = useTranslation();
  const history = useHistory();
  const { setBackNavButton } = useNavigation();
  const { variables } = usePlanReportFilters();
  const [isFiltersModalOpen, toggleFiltersModalOpen] = useToggle(false);
  const { setFileToDownload, fileToDownload } = useFileDownload();
  const { generateReport, loading: isReportGenerating } = useReportGenerator();

  const hasPlan = !isEmpty(variables.filter.planId);

  const {
    data: planReportData,
    loading,
    error,
  } = useQuery(PLAN_REPORT, {
    variables,
    skip: !hasPlan,
  });

  useUpdateEffect(() => {
    if (fileToDownload?.mutation) {
      generateReport();
    }
  }, [fileToDownload?.mutation]);

  const handleDownloadCSV = async () => {
    setFileToDownload({
      mutation: GENERATE_GOAL_PLAN_REPORT,
      query: GOAL_PLANS_REPORT,
      variables: {
        ...variables.filter,
      },
    });
  };

  useEffect(() => {
    if (!hasPlan) {
      history.replace(`/reports/${REPORT_PATHS.GOAL_PLANS}/filters`);
    }

    setBackNavButton(true);

    return () => setBackNavButton(false);
  }, []);

  if (error) {
    return <div className='text-center'>{t('common.messages.dataLoadingError')}</div>;
  }

  return (
    <SharedMainContent>
      <div className='pb-xs mb-xs xxxl:mb-sm sticky top-lg z-high bg-neutral-200'>
        <div className='flex justify-between items-center'>
          <h4 className='text-base xxxl:text-lg mb-0'>
            {t('reports.goalsReport', { reportName: t('reports.reportTitle.goalPlans') })}
          </h4>
          <div className='flex gap-base'>
            <Button
              Icon={DownloadIcon}
              disabled={!!fileToDownload?.id}
              isLoading={isReportGenerating}
              size={isFullHD ? 'md' : 'sm'}
              type='button'
              variant='primary-outlined'
              onClick={handleDownloadCSV}>
              {t('common.actions.downloadCSV')}
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
        <PlanReportFiltersModal
          isOpen={isFiltersModalOpen}
          schoolYearStartDate={schoolYearStartDate}
          onClose={() => toggleFiltersModalOpen(false)}
        />
      </div>
      <div className='flex flex-col gap-base xxxl:gap-md'>
        <Summary isLoading={loading} planReportData={planReportData} />
        <PlanGroupsStatistics isLoading={loading} planReportData={planReportData} />
        <PlanStatementReport
          studentsCount={planReportData?.reports.planReport.summary.studentsTotal}
        />
      </div>
    </SharedMainContent>
  );
};
