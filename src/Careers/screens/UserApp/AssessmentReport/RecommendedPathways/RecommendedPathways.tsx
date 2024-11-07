import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import { ClusterRecommendationItem } from '@dc/graphql/user/queries/reportsAssessmentReport';
import { RecommendedPathwaysChartSkeleton } from '@dc/screens/UserApp/AssessmentReport/RecommendedPathways/RecommendedPathwaysChartSkeleton';

import SharedCard from '@shared/components/Card/Card';

import { RecommendedPathwaysChart } from './RecommendedPathwaysChart';

type Props = {
  isLoading: boolean;
  clusterRecommendationCounts: ClusterRecommendationItem[] | undefined;
};

export const RecommendedPathways = ({ isLoading, clusterRecommendationCounts }: Props) => {
  const { t } = useTranslation();

  const hasData = !isLoading && !isEmpty(clusterRecommendationCounts);

  return (
    <SharedCard>
      <h5 className='text-sm xxxl:text-base mb-xs xxxl:mb-sm'>
        {t('assessmentReport.recommendedPathways')}
      </h5>
      <p className='text-xs xxxl:text-sm leading-lg xxxl:mb-base'>
        {t('assessmentReport.recommendedPathwaysDescription')}
      </p>
      <div className='p-md'>
        {isLoading && <RecommendedPathwaysChartSkeleton />}
        {hasData && (
          <RecommendedPathwaysChart clusterRecommendationCounts={clusterRecommendationCounts} />
        )}
        {!hasData && (
          <div className='flex justify-center items-center h-[100px] xxxl:h-[250px]'>
            {t('assessmentReport.emptyRecommendedPathways')}
          </div>
        )}
      </div>
    </SharedCard>
  );
};
