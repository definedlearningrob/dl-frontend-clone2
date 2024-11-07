import { useTranslation } from 'react-i18next';
import { useCareerExplorationReportVisitCountsQuery } from '@graphql/dc/users/hooks';

import { CareerExplorationEngagementChart } from '@dc/screens/UserApp/CareerPathwayReport/CareerPathwayEngagementsChart/CareerExplorationEngagementChart';
import { CareerPathwayEngagementChartSkeleton } from '@dc/screens/UserApp/CareerPathwayReport/CareerPathwayEngagementsChart/CareerPathwayEngagementChartSkeleton';
import { useCareerExplorationReportFilters } from '@dc/components/CareerPathwayReport/useCareerExplorationReportFilters';

export const CareerExplorationEngagement = () => {
  const { t } = useTranslation();
  const { variables } = useCareerExplorationReportFilters();

  const { data, loading } = useCareerExplorationReportVisitCountsQuery({
    variables,
    fetchPolicy: 'no-cache',
  });

  return (
    <>
      <h5 className='text-sm xxxl:text-base mb-xs xxxl:mb-sm'>
        {t('careerExplorationReport.experiences')}
      </h5>
      <p className='text-xs xxxl:text-sm leading-lg xxxl:mb-base'>
        {t('careerExplorationReport.experiencesDescription')}
      </p>
      <div className='p-md'>
        {loading && <CareerPathwayEngagementChartSkeleton />}
        {!loading && (
          <CareerExplorationEngagementChart
            visitCountsData={data?.reports?.pathwayReport?.visitCounts}
          />
        )}
      </div>
    </>
  );
};
