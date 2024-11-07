import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import { TPathway } from '@dc/resources/types';
import { ReactComponent as PathwayIcon } from '@dc/assets/icons/pathway.svg';

import { ReactComponent as DeadlineIcon } from '@shared/assets/icons/deadline.svg';
import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as CalendarIcon } from '@shared/assets/icons/calendar.svg';
import { Tooltip } from '@shared/components/Tooltip';
import { formatDateTime, getPeriod } from '@shared/utils/date';

type Props = {
  deadline: string | null;
  periodStart: string | null;
  periodEnd: string | null;
  pathways: Pick<TPathway, 'name' | 'id'>[];
};

export const RegularCardContent = ({ deadline, periodEnd, periodStart, pathways }: Props) => {
  const { t } = useTranslation();
  const hasPeriodSet = periodStart && periodEnd;
  const hasAnyDateSet = hasPeriodSet || deadline;

  const pathwayNames = pathways.map((pathway) => pathway.name).join(', ');

  const metadataClasses = 'flex items-center text-xxs mb-xxs last:mb-0 xxxl:text-xs';
  const metadataIconClasses = 'text-font-secondary mr-xxs xxxl:mr-xs';
  const metadataLabel = 'text-font-secondary mr-xxs';

  return (
    <>
      {hasPeriodSet && (
        <span className={metadataClasses}>
          <SharedIcon className={metadataIconClasses} icon={<CalendarIcon />} size='xs' />
          <span className={metadataLabel}>{t('opportunities.period')}</span>
          <Tooltip
            message={t('opportunities.periodTooltipMessage', {
              periodStart: formatDateTime(periodStart),
              periodEnd: formatDateTime(periodEnd),
            })}>
            <span className='line-clamp-1'>{getPeriod(periodStart, periodEnd)}</span>
          </Tooltip>
        </span>
      )}
      {!hasAnyDateSet && (
        <div className={cx(metadataClasses, '!items-start')}>
          <SharedIcon className={metadataIconClasses} icon={<PathwayIcon />} size='xs' />
          <Tooltip className='line-clamp-3 whitespace-pre-wrap' message={pathwayNames}>
            <span className={metadataLabel}>
              {t('opportunities.pathways', { count: pathways.length })}
            </span>
            {pathwayNames || t('opportunities.notSelected')}
          </Tooltip>
        </div>
      )}
      {deadline && (
        <span className={metadataClasses}>
          <SharedIcon className={metadataIconClasses} icon={<DeadlineIcon />} size='xs' />
          <span className={metadataLabel}>{t('opportunities.deadline')}</span>
          {formatDateTime(deadline)}
        </span>
      )}
    </>
  );
};
