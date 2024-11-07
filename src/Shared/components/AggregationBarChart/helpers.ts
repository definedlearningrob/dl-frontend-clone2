import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import localeData from 'dayjs/plugin/localeData';

import { AGGREGATION_PERIOD } from '@shared/resources/enums';

dayjs.extend(utc);
dayjs.extend(localeData);

const months = dayjs.monthsShort();

const groupSizeMap = {
  QUARTER: 3,
  SEMESTER: 6,
};

export const groupMonths = (months: string[], groupSize: number) => {
  let groupedMonths: string[] = [];
  for (let i = 0; i < months.length; i += groupSize) {
    const group = months.slice(i, i + groupSize);
    groupedMonths.push(`${group[0]} - ${group[group.length - 1]}`);
  }

  return groupedMonths;
};

export const generateMonthLabels = (startDate: Dayjs, aggregation: AGGREGATION_PERIOD) => {
  const startMonth = startDate.month();

  const rotatedMonths = months.slice(startMonth).concat(months.slice(0, startMonth));

  if (aggregation === AGGREGATION_PERIOD.MONTH) {
    return rotatedMonths;
  }

  return groupMonths(rotatedMonths, groupSizeMap[aggregation]);
};
