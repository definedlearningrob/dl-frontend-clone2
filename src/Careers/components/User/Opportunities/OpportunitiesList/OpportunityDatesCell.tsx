import { Opportunity } from '@graphql/dc/users/types';
import { useTranslation } from 'react-i18next';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { Tooltip } from '@shared/components/Tooltip';
import { ReactComponent as CalendarIcon } from '@shared/svg/calendar.svg';
import { ReactComponent as DeadlineIcon } from '@shared/svg/deadline.svg';
import { cx } from '@shared/utils/cx';
import { formatDateTime } from '@shared/utils/date';

type Props = {
  opportunity: Pick<Opportunity, 'periodEnd' | 'periodStart' | 'deadline'>;
};

export const OpportunityDatesCell = ({ opportunity }: Props) => {
  const { t } = useTranslation();

  const { periodStart, periodEnd, deadline } = opportunity;

  const periodStartLabel = periodStart
    ? formatDateTime(periodStart)
    : t('user.opportunities.noStartDate');
  const periodEndLabel = periodEnd ? formatDateTime(periodEnd) : t('user.opportunities.noEndDate');
  const hasPeriod = periodStart || periodEnd;

  const getPeriodClasses = (period: string | null) =>
    cx('whitespace-nowrap', { [noPeriodClasses]: !period });

  const rowClasses = 'flex flex-wrap items-center gap-xxs xxxl:gap-xs w-fit';
  const iconClasses = 'text-font-secondary group-hover/row:text-font-primary';
  const noPeriodClasses = 'text-font-secondary italic';

  const periodTooltipMessage = hasPeriod
    ? `${periodStartLabel} - ${periodEndLabel}`
    : t('user.opportunities.noPeriod');
  const deadlineTooltipMessage = deadline
    ? formatDateTime(deadline)
    : t('user.opportunities.noDeadline');

  return (
    <div className='flex flex-col gap-xxxs'>
      <Tooltip
        className={rowClasses}
        message={
          <>
            <div className='font-medium'>{t('user.opportunities.period')}:</div>
            {periodTooltipMessage}
          </>
        }>
        <IconContainer Icon={CalendarIcon} className={iconClasses} paddingSize='none' size='sm' />
        {hasPeriod && (
          <>
            <span className={getPeriodClasses(periodStart)}>{periodStartLabel}</span> -
            <span className={getPeriodClasses(periodEnd)}>{periodEndLabel}</span>
          </>
        )}
        {!hasPeriod && (
          <span className='text-font-secondary italic'>{t('user.opportunities.noPeriod')}</span>
        )}
      </Tooltip>
      <Tooltip
        className={rowClasses}
        message={
          <>
            <div className='font-medium'>{t('user.opportunities.deadline')}:</div>
            {deadlineTooltipMessage}
          </>
        }>
        <IconContainer Icon={DeadlineIcon} className={iconClasses} paddingSize='none' size='sm' />
        {deadline && formatDateTime(deadline)}
        {!deadline && (
          <span className='text-font-secondary italic'>{t('user.opportunities.noDeadline')}</span>
        )}
      </Tooltip>
    </div>
  );
};
