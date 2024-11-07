import dayjs from 'dayjs';
import { times } from 'lodash-es';

export const generateMockedAggregationPeriods = (baseYear: number) =>
  times(12, (i) => {
    const periodStart = dayjs(`${baseYear}-01-01`).add(i, 'month').format('YYYY-MM-DD');
    const periodEnd = dayjs(periodStart).endOf('month').format('YYYY-MM-DD');

    return {
      averageScore: 0,
      period: i + 1,
      periodEnd,
      periodStart,
      studentsCount: 0,
    };
  });

export const mockedTagSummary = {
  tag: {
    id: '123',
    name: '-----',
  },
  studentsCount: 0,
  cumulativeAverageScore: 0,
  aggregationPeriods: generateMockedAggregationPeriods(2020),
};
