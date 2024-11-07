import { Trans, useTranslation } from 'react-i18next';
import { Get } from 'type-fest';
import { useMemo } from 'react';
import { CareerReviewSurveyReportQuery } from '@graphql/dc/users/operations';

import { AnswerDistributionChart } from '@dc/components/CareerReviewSurveyReport/AnswerDistributionChart/AnswerDistributionChart';

import SharedCard from '@shared/components/Card/Card';
import { Kicker } from '@shared/components/Kicker';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

import { AnswerDistributionInfo } from './AnswerDistributionInfo';
import { AnswerDistributionChartsSkeleton } from './AnswerDistributionChartsSkeleton';

type Props = {
  questionAnswersCounts:
    | Get<CareerReviewSurveyReportQuery, 'reports.careerReviewSurveyReport.questionAnswerCounts'>
    | undefined;
  studentsAnsweredCount: number | undefined;
  isLoading?: boolean;
};

export const AnswerDistribution = ({
  questionAnswersCounts,
  studentsAnsweredCount = 0,
  isLoading,
}: Props) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const normalizedQuestionAnswers = useMemo(
    () =>
      questionAnswersCounts?.map(({ question, baselineCounts, currentCounts }) => {
        const baselineMap = new Map(baselineCounts.map((item) => [item.answer, item.count]));
        const currentMap = new Map(currentCounts.map((item) => [item.answer, item.count]));

        const answers = baselineMap.keys();

        return {
          question,
          data: Array.from(answers).map((answer) => ({
            answer,
            baseline: baselineMap.get(answer) ?? 0,
            mostRecent: currentMap.get(answer) ?? 0,
          })),
        };
      }),
    [questionAnswersCounts]
  );

  const isLoaded = !isLoading && !!normalizedQuestionAnswers;

  return (
    <SharedCard>
      <h5 className='text-sm xxxl:text-base mb-xs xxxl:mb-sm'>
        <Trans
          components={{
            neutralText: <span className='text-neutral-600' />,
          }}
          i18nKey='careerReviewSurveyReport.answerDistribution'
          values={{ count: studentsAnsweredCount }}
        />
      </h5>
      <p className='text-xs leading-lg mb-base'>
        {t('careerReviewSurveyReport.answerDistributionDescription')}
      </p>
      <AnswerDistributionInfo />
      {isLoading && <AnswerDistributionChartsSkeleton />}
      {isLoaded && (
        <div className='rounded-sm border border-neutral-300 mt-base xxxl:mt-md'>
          {normalizedQuestionAnswers?.map(({ question, data }, index) => (
            <div
              key={question.id}
              className='flex flex-col text-center py-md px-base xxxl:px-md border-b border-b-neutral-300 last:border-none'>
              <Kicker size={isFullHD ? 'md' : 'sm'}>
                {t('careerReviewSurveyReport.questionWithNumber', { number: index + 1 })}
              </Kicker>
              <h6 className='text-xs xxxl:text-sm mb-base xxxl:mb-md max-w-[720px] self-center'>
                {question.question}
              </h6>
              <AnswerDistributionChart data={data} total={studentsAnsweredCount} />
            </div>
          ))}
        </div>
      )}
    </SharedCard>
  );
};
