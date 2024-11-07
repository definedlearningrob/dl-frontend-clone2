import { useOpportunityReportTypesChartQuery } from '@graphql/dc/users/hooks';
import { useTranslation } from 'react-i18next';

import { useOpportunityReportFilters } from '@dc/components/OpportunityReport/useOpportunityReportFilters';
import { ReactComponent as OpportunitiesIcon } from '@dc/assets/icons/opportunities_icon.svg';
import { OpportunityReportTypesChartSkeleton } from '@dc/screens/UserApp/OpportunityReport/OpportunityReportTypesCount/OpportunityReportTypesChartSkeleton';
import { OpportunityReportTypesChart } from '@dc/screens/UserApp/OpportunityReport/OpportunityReportTypesCount/OpportunityReportTypesChart';

const opportunitiesTypeMap = {
  APPRENTICESHIP: 'opportunitiesReport.types.apprenticeship',
  CLINICAL_EXPERIENCE: 'opportunitiesReport.types.clinicalExperience',
  COLLEGE_VISIT: 'opportunitiesReport.types.collegeVisit',
  INTERNSHIP: 'opportunitiesReport.types.internship',
  JOB: 'opportunitiesReport.types.job',
  JOB_SHADOW: 'opportunitiesReport.types.jobShadow',
  OTHER: 'opportunitiesReport.types.other',
  PRACTICUM: 'opportunitiesReport.types.practicum',
  PRE_APPRENTICESHIP: 'opportunitiesReport.types.preApprenticeship',
  SPEAKER: 'opportunitiesReport.types.speaker',
  VIRTUAL_INTERNSHIP: 'opportunitiesReport.types.virtualInternship',
  WORKPLACE_TOUR: 'opportunitiesReport.types.workplaceTour',
} as const;

export const OpportunityReportTypesCount = () => {
  const { variables } = useOpportunityReportFilters();

  const { t } = useTranslation();

  const { data, loading: isTypesChartLoading } = useOpportunityReportTypesChartQuery({
    variables,
    fetchPolicy: 'no-cache',
  });

  const parsedData =
    data?.reports?.opportunityReport?.typeCounts
      .map(({ opportunityType, applicationsCount }) => ({
        name: t(opportunitiesTypeMap[opportunityType]),
        value: applicationsCount,
        tooltipIcon: OpportunitiesIcon,
      }))
      .filter((item) => item.value > 0) || [];

  const renderChartTooltipContent = (data: { name: string; value: number }) => (
    <div className='flex flex-col gap-xxs whitespace-nowrap'>
      <span>{t('opportunitiesReport.applicationsCount', { count: data.value })}</span>
    </div>
  );

  return (
    <>
      {isTypesChartLoading && <OpportunityReportTypesChartSkeleton />}
      {!isTypesChartLoading && (
        <OpportunityReportTypesChart
          data={parsedData}
          description={t('opportunitiesReport.opportunityApplicationsDescription')}
          renderTooltipContent={renderChartTooltipContent}
          title={t('opportunitiesReport.opportunityApplications')}
        />
      )}
    </>
  );
};
