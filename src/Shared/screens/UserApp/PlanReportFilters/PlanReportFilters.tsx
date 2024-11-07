import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import goalPlanFiltersImage from '@shared/assets/images/student_plans.jpeg';
import {
  FINAL_STEP,
  PlanReportFilters as PlanReportFiltersInputs,
} from '@shared/components/PlanReport';
import { usePlanReportFilters } from '@shared/components/PlanReport/usePlanReportFilters';
import { ReportFilterWrapper } from '@shared/components/ReportFilterWrapper/ReportFilterWrapper';
import { MainContent } from '@shared/components/MainContent/MainContent';
import { REPORT_PATHS } from '@shared/resources/constants';

type Props = {
  schoolYearStartDate: { day: number; month: number };
};

export const PlanReportFilters = ({ schoolYearStartDate }: Props) => {
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
        redirectTo={`/reports/${REPORT_PATHS.GOAL_PLANS}/report`}
        reportImageSrc={goalPlanFiltersImage}
        reportName={t('reports.goalsReport', { reportName: t('reports.reportTitle.goalPlans') })}
        onFilterApply={submitFilters}>
        <PlanReportFiltersInputs
          schoolYearStartDate={schoolYearStartDate}
          onStepChange={handleStepChange}
        />
      </ReportFilterWrapper>
    </MainContent>
  );
};
