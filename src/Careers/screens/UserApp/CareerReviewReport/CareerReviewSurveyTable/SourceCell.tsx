import { lowerCase, startCase } from 'lodash-es';
import { match } from 'ts-pattern';
import { FC, SVGProps } from 'react';
import {
  CareerReviewSurveyAnswerContextTypes,
  CareerReviewSurveyReportResult,
} from '@graphql/dc/users/types';
import { useTranslation } from 'react-i18next';

import { ReactComponent as HomeIcon } from '@dc/assets/icons/home_dashboard.svg';

import { ReactComponent as BookIcon } from '@shared/assets/icons/book_opened.svg';
import { ReactComponent as LaptopIcon } from '@shared/assets/icons/laptop.svg';
import { ReactComponent as ListIcon } from '@shared/assets/icons/list-task-graduate-hat.svg';
import { Badge, BadgeType } from '@shared/components/Badge/Badge';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { Tooltip } from '@shared/components/Tooltip';
import { cx } from '@shared/utils/cx';

type Props = {
  careerSource: Omit<CareerReviewSurveyReportResult, 'lastTakenAt'>;
};

export const SourceCell = ({ careerSource }: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { t } = useTranslation();
  const { contextType } = careerSource;
  const badgeSize = isFullHD ? 'base' : 'small';

  const { Icon, type, contextTypeDisplay } = match(contextType)
    .returnType<{
      Icon?: FC<SVGProps<SVGSVGElement>>;
      type: BadgeType;
      contextTypeDisplay: CareerReviewSurveyAnswerContextTypes | string;
    }>()
    .with(CareerReviewSurveyAnswerContextTypes.COURSE, () => ({
      Icon: BookIcon,
      type: 'success',
      contextTypeDisplay: t('careerReviewSurveyReport.surveyReport.answers.course'),
    }))
    .with(CareerReviewSurveyAnswerContextTypes.ASSESSMENT, () => ({
      Icon: ListIcon,
      type: 'secondary',
      contextTypeDisplay: t('careerReviewSurveyReport.surveyReport.answers.assessment'),
    }))
    .with(CareerReviewSurveyAnswerContextTypes.VIRTUAL_INTERNSHIP, () => ({
      Icon: LaptopIcon,
      type: 'neutral',
      contextTypeDisplay: t('careerReviewSurveyReport.surveyReport.answers.virtualInternships'),
    }))
    .otherwise(() => ({
      Icon: HomeIcon,
      type: 'primary',
      contextTypeDisplay: t('careerReviewSurveyReport.surveyReport.answers.dashboard'),
    }));

  const contextMarkClassName = cx(
    'm-0 p-0 bg-neutral-600 text-white rounded-xs font-medium text-xxs xxxl:text-xs w-[16px] h-[16px] xxxl:w-[24px] xxxl:h-[24px] flex justify-center items-center',
    {
      'bg-chartSecondary-600': careerSource.isCurrent,
    }
  );

  const { sign, signClassName, message } = match({
    isBaseline: careerSource.isBaseline,
    isCurrent: careerSource.isCurrent,
  })
    .returnType<{
      sign: string;
      signClassName?: string;
      message: string;
    }>()
    .with({ isBaseline: true }, () => ({
      sign: t('careerReviewSurveyReport.surveyReport.baseLineChar'),
      signClassName: contextMarkClassName,
      message: t('careerReviewSurveyReport.baseline'),
    }))
    .with({ isCurrent: true }, () => ({
      sign: t('careerReviewSurveyReport.surveyReport.mostRecentChar'),
      signClassName: contextMarkClassName,
      message: t('careerReviewSurveyReport.mostRecent'),
    }))
    .otherwise(() => ({
      sign: ' ',
      signClassName: '',
      message: '',
    }));

  return (
    <div className='flex justify-between items-center'>
      <div className='flex gap-xs xxxl:gap-sm items-center'>
        <Badge
          Icon={Icon}
          className='py-xxxs xxxl:py-xxs group-aria-expanded/expandedRow:!bg-white'
          size={badgeSize}
          type={type}>
          <span className='truncate'>{startCase(lowerCase(contextTypeDisplay))}</span>
        </Badge>
        <p className='mb-0'>{careerSource.contextName}</p>
      </div>
      <Tooltip className='cursor-default' delayDuration={500} message={message}>
        <span className={signClassName}>{sign}</span>
      </Tooltip>
    </div>
  );
};
