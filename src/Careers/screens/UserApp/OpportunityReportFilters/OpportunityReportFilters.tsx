import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import { useOpportunityReportFilters } from '@dc/components/OpportunityReport/useOpportunityReportFilters';
import {
  OpportunityReportFiltersInputs,
  FINAL_STEP,
} from '@dc/components/OpportunityReport/OpportunityReportFiltersInputs';

import opportunityReportImage from '@shared/assets/images/opportunities.jpeg';
import { MainContent } from '@shared/components/MainContent/MainContent';
import { ReportFilterWrapper } from '@shared/components/ReportFilterWrapper/ReportFilterWrapper';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import { REPORT_PATHS } from '@shared/resources/constants';

export const OpportunityReportFilters = () => {
  const { t } = useTranslation();
  const { setBackNavButton } = useNavigation();
  const { submitFilters } = useOpportunityReportFilters();
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
        redirectTo={`/reports/${REPORT_PATHS.OPPORTUNITIES}/report`}
        reportImageSrc={opportunityReportImage}
        reportName={t('reports.reportName', {
          reportName: t('reports.reportTitle.opportunities'),
        })}
        onFilterApply={submitFilters}>
        <OpportunityReportFiltersInputs onStepChange={handleStepChange} />
      </ReportFilterWrapper>
    </MainContent>
  );
};
