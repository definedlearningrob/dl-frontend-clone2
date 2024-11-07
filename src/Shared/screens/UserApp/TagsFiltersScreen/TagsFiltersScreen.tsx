import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TagsReportFilters } from '@shared/components/TagsReport';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import performanceIndicatorsImage from '@shared/assets/images/performance_indicators.jpeg';
import { usePlanReportFilters } from '@shared/components/PlanReport/usePlanReportFilters';
import { ReportFilterWrapper } from '@shared/components/ReportFilterWrapper/ReportFilterWrapper';
import { MainContent } from '@shared/components/MainContent/MainContent';
import { REPORT_PATHS } from '@shared/resources/constants';

const FINAL_STEP = 4;

type Props = {
  schoolYearStartDate: { day: number; month: number };
};

export const TagsFiltersScreen = ({ schoolYearStartDate }: Props) => {
  const { t } = useTranslation();

  const { setBackNavButton } = useNavigation();
  const { submitFilters } = usePlanReportFilters();
  const [isSubmitEnabled, setSubmitEnabled] = useState(false);

  useEffect(() => {
    setBackNavButton(true);

    return () => setBackNavButton(false);
  }, []);

  const handleStepChange = (activeStep: number) => {
    setSubmitEnabled(activeStep === FINAL_STEP);
  };

  return (
    <MainContent className='h-[theme(layout.containerHeight)]'>
      <ReportFilterWrapper
        filterInstruction={t('reports.filterInstructions')}
        isSubmitEnabled={isSubmitEnabled}
        redirectTo={`/reports/${REPORT_PATHS.GOAL_PERFORMANCE_INDICATORS}/report`}
        reportImageSrc={performanceIndicatorsImage}
        reportName={t('reports.goalsReport', {
          reportName: t('reports.reportTitle.goalPerformanceIndicators'),
        })}
        onFilterApply={submitFilters}>
        <TagsReportFilters
          schoolYearStartDate={schoolYearStartDate}
          onStepChange={handleStepChange}
        />
      </ReportFilterWrapper>
    </MainContent>
  );
};
