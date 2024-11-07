import { formatDateTime, parseDate } from '@shared/utils/date';
import { Tooltip } from '@shared/components/Tooltip';

type Props = { date: string };

export const DateCell = ({ date }: Props) => {
  const formattedDate = parseDate(date);

  return <Tooltip message={formatDateTime(date, { withTime: true })}>{formattedDate}</Tooltip>;
};
