import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import { FINAL_STEP } from '@dc/components/CareerReviewSurveyReport/CareerReviewSurveyReportFiltersInputs';
import { CareerReviewSurveyReportFiltersInputs } from '@dc/components/CareerReviewSurveyReport/CareerReviewSurveyReportFiltersInputs';
import { useCareerReviewSurveyReportFilters } from '@dc/components/CareerReviewSurveyReport/useCareerReviewSurveyReportFilters';

import careerReviewReportImage from '@shared/assets/images/career_review_survey.jpeg';
import { MainContent } from '@shared/components/MainContent/MainContent';
import { ReportFilterWrapper } from '@shared/components/ReportFilterWrapper/ReportFilterWrapper';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import { REPORT_PATHS } from '@shared/resources/constants';

export const CareerReviewFilters = () => {
  const { t } = useTranslation();
  const { setBackNavButton } = useNavigation();
  const { submitFilters } = useCareerReviewSurveyReportFilters();
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
        redirectTo={`/reports/${REPORT_PATHS.CAREER_REVIEW_SURVEY}/report`}
        reportImageSrc={careerReviewReportImage}
        reportName={t('reports.reportName', {
          reportName: t('reports.reportTitle.careerReviewSurvey'),
        })}
        onFilterApply={submitFilters}>
        <CareerReviewSurveyReportFiltersInputs onStepChange={handleStepChange} />
      </ReportFilterWrapper>
    </MainContent>
  );
};
