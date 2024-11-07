import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
import updateLocale from 'dayjs/plugin/updateLocale';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import minMax from 'dayjs/plugin/minMax';
import { t } from 'i18next';

type FormatDateTimeOptions = {
  dateFormat?: string;
  dateTimeFormat?: string;
  withTime?: boolean;
};

dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.extend(updateLocale);
dayjs.extend(isSameOrBefore);
dayjs.extend(minMax);

dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: 'Now',
    m: 'a minute ago',
    mm: '%dm ago',
    h: 'an hour ago',
    hh: '%dh ago',
    d: 'Yesterday',
    dd: '%d days ago',
    M: 'a month ago',
    MM: '%d months ago',
    y: 'a year ago',
    yy: '%d years ago',
  },
});

export const parseDate = (date: string) => {
  const twoDaysAgo = dayjs().subtract(35, 'hour');
  const isOlderThanTwoDays = dayjs(date).isSameOrBefore(twoDaysAgo);

  return isOlderThanTwoDays ? dayjs(date).format('MMM D, YYYY') : dayjs(date).fromNow();
};

export const formatDateTime = (
  date: string,
  {
    dateFormat = 'MMM D, YYYY',
    dateTimeFormat = 'MMMM D, YYYY, hh:mm A',
    withTime = false,
  }: FormatDateTimeOptions = {}
) => {
  const format = withTime ? dateTimeFormat : dateFormat;

  return dayjs(date).format(format);
};

export const parseToRelativeTime = (dateTo: string) => {
  const time = 'h:mm A';
  const date = 'MM/DD/YYYY';
  const dayOfWeek = 'ddd';

  return dayjs(dateTo).calendar(null, {
    sameDay: t('relativeTime.sameDay', { time: time }),
    lastDay: t('relativeTime.lastDay', { time: time }),
    lastWeek: t('relativeTime.lastWeek', { time: time, dayOfWeek: dayOfWeek }),
    sameElse: t('relativeTime.sameElse', { time: time, date: date }),
  });
};

export const getPeriod = (dateStart: string, dateEnd: string) =>
  `${formatDateTime(dateStart)} - ${formatDateTime(dateEnd)}`;

export const getDateWithCurrentTime = (date: Date) =>
  dayjs()
    .set('year', date.getFullYear())
    .set('month', date.getMonth())
    .set('date', date.getDate())
    .toDate();

export const getIsExpired = (date: string | null | undefined) =>
  date ? dayjs(date).add(1, 'day').isBefore(dayjs()) : undefined;
