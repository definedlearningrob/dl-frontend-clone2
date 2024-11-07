import { useTranslation } from 'react-i18next';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { Tooltip } from '@shared/components/Tooltip';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';

type Props = {
  answer: string;
  answerHeight: number;
};

export const AnswerLabel = ({ answer, answerHeight }: Props) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const isOther = answer.toLowerCase() === 'other';

  return (
    <div
      className='flex items-center gap-xs text-right text-xxs xxxl:text-xs font-medium line-clamp-2 leading-lg'
      style={{ height: answerHeight }}>
      {answer}
      {isOther && (
        <Tooltip
          className='text-neutral-500 hover:text-primary-500 transition-colors'
          delayDuration={200}
          message={t('careerReviewSurveyReport.otherAnswerDescription')}>
          <IconContainer Icon={InfoIcon} paddingSize='none' size={isFullHD ? 'base' : 'sm'} />
        </Tooltip>
      )}
    </div>
  );
};
