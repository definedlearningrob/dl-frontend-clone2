import { Trans } from 'react-i18next';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';
import Link from '@shared/components/Link';

export const AnswerDistributionInfo = () => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const knowledgeBaseLink = (
    <Link
      className='!text-xxs !inline'
      target='_blank'
      to={{
        pathname:
          'https://support.definedlearning.com/article/228-defined-learning-updated-knowledge-base',
      }}
      variant='link'
    />
  );

  return (
    <div className='p-xs xxxl:p-sm border border-neutral-300 rounded-sm flex gap-xs xxxl:gap-x items-center text-xxs xxxl:text-xs font-medium leading-lg'>
      <IconContainer
        Icon={InfoIcon}
        className='bg-info-100 rounded-sm text-info-500'
        size={isFullHD ? 'base' : 'sm'}
      />
      <p className='mb-0'>
        <Trans
          components={{ knowledgeBaseLink }}
          i18nKey='careerReviewSurveyReport.answerDistributionChartDescription'
        />
      </p>
    </div>
  );
};
