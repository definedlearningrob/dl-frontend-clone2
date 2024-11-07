import { useTranslation } from 'react-i18next';

import { Tooltip } from '@shared/components/Tooltip';
import { formatDateTime } from '@shared/utils/date';

type Props = {
  date: string | null;
};

export const DateWithTooltip = ({ date }: Props) => {
  const { t } = useTranslation();

  if (!date) {
    return <span>{t('sharedCommon.notAvailableShort')}</span>;
  }

  return (
    <Tooltip delayDuration={300} message={formatDateTime(date, { withTime: true })}>
      <span>{formatDateTime(date)}</span>
    </Tooltip>
  );
};
