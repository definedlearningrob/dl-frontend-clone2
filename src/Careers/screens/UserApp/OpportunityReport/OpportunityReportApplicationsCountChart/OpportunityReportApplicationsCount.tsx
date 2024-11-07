import { useTranslation } from 'react-i18next';
import { useOpportunityReportApplicationCountQuery } from '@graphql/dc/users/hooks';

import { OpportunityReportApplicationsCountChart } from '@dc/screens/UserApp/OpportunityReport/OpportunityReportApplicationsCountChart/OpportunityReportApplicationsCountChart';
import { OpportunityReportApplicationsCountChartSkeleton } from '@dc/screens/UserApp/OpportunityReport/OpportunityReportApplicationsCountChart/OpportunityReportApplicationsCountChartSkeleton';
import { useOpportunityReportFilters } from '@dc/components/OpportunityReport/useOpportunityReportFilters';

export const OpportunityReportApplicationsCount = () => {
  const { t } = useTranslation();
  const { variables } = useOpportunityReportFilters();

  const { data, loading } = useOpportunityReportApplicationCountQuery({
    variables,
    fetchPolicy: 'no-cache',
  });

  return (
    <div className='border border-neutral-300 rounded-sm p-base xxxl:p-md text-center'>
      <h6 className='text-xs xxxl:text-sm mb-xs'>
        {t('opportunitiesReport.opportunityApplications')}
      </h6>
      <p className='text-xxs xxxl:text-xs italic leading-lg xxxl:mb-base'>
        {t('opportunitiesReport.opportunityApplicationsByPathwayDescription')}
      </p>
      {loading && <OpportunityReportApplicationsCountChartSkeleton />}
      {!loading && (
        <OpportunityReportApplicationsCountChart
          clusterCountsData={data?.reports?.opportunityReport?.clusterCounts}
        />
      )}
    </div>
  );
};
