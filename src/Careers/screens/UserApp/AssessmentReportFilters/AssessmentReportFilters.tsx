import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import { useAssessmentReportFilters } from '@dc/components/AssessmentReport/useAssessmentReportFilters';
import {
  AssessmentReportFiltersInputs,
  FINAL_STEP,
} from '@dc/components/AssessmentReport/AssessmentReportFiltersInputs';

import assessmentReportImage from '@shared/assets/images/assessment.jpeg';
import { MainContent } from '@shared/components/MainContent/MainContent';
import { ReportFilterWrapper } from '@shared/components/ReportFilterWrapper/ReportFilterWrapper';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import { REPORT_PATHS } from '@shared/resources/constants';

export const AssessmentReportFilters = () => {
  const { t } = useTranslation();
  const { setBackNavButton } = useNavigation();
  const { submitFilters } = useAssessmentReportFilters();
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
        redirectTo={`/reports/${REPORT_PATHS.ASSESSMENT}/report`}
        reportImageSrc={assessmentReportImage}
        reportName={t('reports.reportName', {
          reportName: t('reports.reportTitle.assessment'),
        })}
        onFilterApply={submitFilters}>
        <AssessmentReportFiltersInputs onStepChange={handleStepChange} />
      </ReportFilterWrapper>
    </MainContent>
  );
};
