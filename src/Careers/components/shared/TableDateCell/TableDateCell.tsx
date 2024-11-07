import isEmpty from 'lodash-es/isEmpty';
import { t } from 'i18next';

import { formatDateTime, parseDate } from '@shared/utils/date';
import { Tooltip } from '@shared/components/Tooltip';

type Props = {
  date: string;
  className?: string;
};

export const TableDateCell = ({ date, className }: Props) => (
  <span className={className}>
    {isEmpty(date) ? (
      t('shared.notAvailableShort')
    ) : (
      <Tooltip message={formatDateTime(date, { withTime: true })}>{parseDate(date)}</Tooltip>
    )}
  </span>
);
