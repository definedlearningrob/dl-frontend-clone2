import dayjs from 'dayjs';

import { AGGREGATION_PERIOD } from '@shared/resources/enums';

import { generateMonthLabels, groupMonths } from './helpers';

describe('AggregationBarChart helpers', () => {
  describe('generateMonthLabels', () => {
    it('should generate 12 labels for MONTH aggregation', () => {
      const result = generateMonthLabels(dayjs('2020-04-12'), AGGREGATION_PERIOD.MONTH);

      const expected = [
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
        'Jan',
        'Feb',
        'Mar',
      ];

      expect(result).toEqual(expected);
    });

    it('should generate 4 labels for QUARTER aggregation', () => {
      const result = generateMonthLabels(dayjs('2020-04-12'), AGGREGATION_PERIOD.QUARTER);

      const expected = ['Apr - Jun', 'Jul - Sep', 'Oct - Dec', 'Jan - Mar'];

      expect(result).toEqual(expected);
    });

    it('should generate 2 labels for SEMESTER aggregation', () => {
      const result = generateMonthLabels(dayjs('2020-04-12'), AGGREGATION_PERIOD.SEMESTER);

      const expected = ['Apr - Sep', 'Oct - Mar'];

      expect(result).toEqual(expected);
    });
  });

  describe('groupMonths', () => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    it('should group months by 3', () => {
      const result = groupMonths(months, 3);

      const expected = ['Jan - Mar', 'Apr - Jun', 'Jul - Sep', 'Oct - Dec'];

      expect(result).toEqual(expected);
    });

    it('should group months by 6', () => {
      const result = groupMonths(months, 6);

      const expected = ['Jan - Jun', 'Jul - Dec'];

      expect(result).toEqual(expected);
    });
  });
});
