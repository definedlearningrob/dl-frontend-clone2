import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import {
  CareerExplorationReportFiltersInputs,
  FINAL_STEP,
} from '@dc/components/CareerPathwayReport/CareerExplorationReportFiltersInputs';
import { useCareerExplorationReportFilters } from '@dc/components/CareerPathwayReport/useCareerExplorationReportFilters';

import careerPathwayReportImage from '@shared/assets/images/career_pathway.jpeg';
import { MainContent } from '@shared/components/MainContent/MainContent';
import { ReportFilterWrapper } from '@shared/components/ReportFilterWrapper/ReportFilterWrapper';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import { REPORT_PATHS } from '@shared/resources/constants';

export const CareerExplorationReportFilters = () => {
  const { t } = useTranslation();
  const { setBackNavButton } = useNavigation();
  const { submitFilters } = useCareerExplorationReportFilters();
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
        redirectTo={`/reports/${REPORT_PATHS.CAREER_PATHWAY}/report`}
        reportImageSrc={careerPathwayReportImage}
        reportName={t('reports.reportName', {
          reportName: t('reports.reportTitle.careerPathway'),
        })}
        onFilterApply={submitFilters}>
        <CareerExplorationReportFiltersInputs onStepChange={handleStepChange} />
      </ReportFilterWrapper>
    </MainContent>
  );
};
