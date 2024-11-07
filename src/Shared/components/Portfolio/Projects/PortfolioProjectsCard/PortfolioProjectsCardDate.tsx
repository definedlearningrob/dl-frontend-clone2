import { useTranslation } from 'react-i18next';

import { useOpportunityPeriodsQuery } from '@dc/graphql/student/hooks/useOpportunityPeriodsQuery';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { PortfolioProjectType } from '@shared/components/Portfolio/types';
import { ReactComponent as CalendarIcon } from '@shared/svg/calendar.svg';
import { formatDateTime, getPeriod } from '@shared/utils/date';
import { Tooltip } from '@shared/components/Tooltip/Tooltip';

type Props = {
  projectId: string;
  submittedAt: string;
  type: PortfolioProjectType;
};

export const PortfolioProjectsCardDate = ({ projectId, submittedAt, type }: Props) => {
  const { t } = useTranslation();

  const isOpportunityProject = type === PortfolioProjectType.OPPORTUNITY;

  const opportunityQueryProps = {
    id: projectId,
    skip: !isOpportunityProject || !projectId,
  };
  const { data } = useOpportunityPeriodsQuery(opportunityQueryProps);
  const periodValue =
    data?.opportunity.periodStart && data?.opportunity.periodEnd
      ? getPeriod(data.opportunity.periodStart, data.opportunity.periodEnd)
      : false;

  if (data && isOpportunityProject && data.opportunity.periodStart && data.opportunity.periodEnd) {
    const { periodStart, periodEnd } = data.opportunity;

    return (
      <Tooltip
        message={t('common.labels.dateFromTo', {
          from: formatDateTime(periodStart, { dateFormat: 'MMMM D, YYYY' }),
          to: formatDateTime(periodEnd, { dateFormat: 'MMMM D, YYYY' }),
        })}>
        <div className='flex items-center'>
          <IconContainer Icon={CalendarIcon} paddingSize='xxs' size='sm' />
          <p className='text-xs leading-lg m-0'>{periodValue}</p>
        </div>
      </Tooltip>
    );
  }

  return (
    <Tooltip message={formatDateTime(submittedAt, { dateFormat: 'MMMM D, YYYY' })}>
      <div className='flex items-center'>
        <IconContainer Icon={CalendarIcon} paddingSize='xxs' size='sm' />
        <p className='text-xs leading-lg m-0 whitespace-nowrap'>{formatDateTime(submittedAt)}</p>
      </div>
    </Tooltip>
  );
};
