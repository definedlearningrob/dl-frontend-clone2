import { times } from 'lodash-es';
import { useTranslation } from 'react-i18next';

import { AnswerDistributionChartLegend } from '@dc/components/CareerReviewSurveyReport/AnswerDistributionChart/AnswerDistributionChartLegend';

import { Kicker } from '@shared/components/Kicker';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

export const AnswerDistributionChartsSkeleton = () => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  return (
    <div className='rounded-sm border border-neutral-300 mt-base xxxl:mt-md'>
      {times(5, (index) => (
        <div
          key={index}
          className='flex flex-col items-center py-md px-base xxxl:px-md border-b border-b-neutral-300 last:border-none'>
          <Kicker size={isFullHD ? 'md' : 'sm'}>
            {t('careerReviewSurveyReport.questionWithNumber', { number: index + 1 })}
          </Kicker>
          <SkeletonRectangle className='mb-base xxxl:mb-md' height='tiny' size='md' />
          <div className='flex gap-base xxxl:gap-md w-full mb-base'>
            <div className='basis-[280px] xxxl:basis-[320px] shrink-0 flex flex-col justify-around items-end mt-[36px]'>
              {times(5, (index) => (
                <SkeletonRectangle
                  key={index}
                  height='tiny'
                  size={index % 3 ? 'full-width' : 'lg'}
                />
              ))}
            </div>
            <SkeletonRectangle height='card' radius='sm' size='full-width' />
          </div>
          <div className='self-start'>
            <AnswerDistributionChartLegend />
          </div>
        </div>
      ))}
    </div>
  );
};
