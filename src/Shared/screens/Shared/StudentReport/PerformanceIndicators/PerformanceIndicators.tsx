import { Trans, useTranslation } from 'react-i18next';

import SharedCard from '@shared/components/Card/Card';
import { PerformanceIndicatorsScoreInfo } from '@shared/components/PerformanceIndicatorsScoreInfo';
import { TPerformanceIndicatorsData } from '@shared/graphql/fragments/goalPerformanceIndicatorsData';

import { PerformanceIndicatorsCharts } from './PerformanceIndicatorsCharts';

type Props = {
  data: TPerformanceIndicatorsData | undefined;
  isLoading?: boolean;
};

export const PerformanceIndicators = ({ data, isLoading }: Props) => {
  const { t } = useTranslation();

  const tagsCount = data?.length || 0;
  const hasNoData = !isLoading && tagsCount === 0;

  return (
    <SharedCard>
      <div className='mb-base xxxl:mb-md'>
        <h5 className='text-sm xxxl:text-base mb-xs xxxl:mb-sm'>
          <Trans
            components={{ neutralText: <span className='text-neutral-600' /> }}
            i18nKey='studentGoalReport.studentPerformanceIndicators'
            values={{ count: tagsCount, context: tagsCount }}
          />
        </h5>
        <p className='text-font-secondary xxxl:text-font-primary text-xs xxxl:text-sm leading-lg xxxl:mb-base'>
          {t('studentGoalReport.studentPerformanceIndicatorsInfo')}
        </p>
        {!hasNoData && <PerformanceIndicatorsScoreInfo />}
      </div>
      <PerformanceIndicatorsCharts chartsData={data} isLoading={isLoading} />
    </SharedCard>
  );
};
