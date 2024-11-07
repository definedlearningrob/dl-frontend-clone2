import { useTranslation } from 'react-i18next';

import { LegendItem } from './LegendItem';

export const AnswerDistributionChartLegend = () => {
  const { t } = useTranslation();

  return (
    <div className='flex gap-sm ml-[304px] xxxl:ml-[352px]'>
      <LegendItem colorClassName='bg-neutral-600' label={t('careerReviewSurveyReport.baseline')} />
      <LegendItem
        colorClassName='bg-chartSecondary-600'
        label={t('careerReviewSurveyReport.mostRecent')}
      />
    </div>
  );
};
