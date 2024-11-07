import { generateMockedAggregationPeriods } from '@shared/screens/UserApp/TagsReport/TagDetails/helpers';

describe('TagDetails helpers', () => {
  it('should generate mocked aggregation periods', () => {
    expect(generateMockedAggregationPeriods(2020)).toEqual([
      {
        averageScore: 0,
        period: 1,
        periodEnd: '2020-01-31',
        periodStart: '2020-01-01',
        studentsCount: 0,
      },
      {
        averageScore: 0,
        period: 2,
        periodEnd: '2020-02-29',
        periodStart: '2020-02-01',
        studentsCount: 0,
      },
      {
        averageScore: 0,
        period: 3,
        periodEnd: '2020-03-31',
        periodStart: '2020-03-01',
        studentsCount: 0,
      },
      {
        averageScore: 0,
        period: 4,
        periodEnd: '2020-04-30',
        periodStart: '2020-04-01',
        studentsCount: 0,
      },
      {
        averageScore: 0,
        period: 5,
        periodEnd: '2020-05-31',
        periodStart: '2020-05-01',
        studentsCount: 0,
      },
      {
        averageScore: 0,
        period: 6,
        periodEnd: '2020-06-30',
        periodStart: '2020-06-01',
        studentsCount: 0,
      },
      {
        averageScore: 0,
        period: 7,
        periodEnd: '2020-07-31',
        periodStart: '2020-07-01',
        studentsCount: 0,
      },
      {
        averageScore: 0,
        period: 8,
        periodEnd: '2020-08-31',
        periodStart: '2020-08-01',
        studentsCount: 0,
      },
      {
        averageScore: 0,
        period: 9,
        periodEnd: '2020-09-30',
        periodStart: '2020-09-01',
        studentsCount: 0,
      },
      {
        averageScore: 0,
        period: 10,
        periodEnd: '2020-10-31',
        periodStart: '2020-10-01',
        studentsCount: 0,
      },
      {
        averageScore: 0,
        period: 11,
        periodEnd: '2020-11-30',
        periodStart: '2020-11-01',
        studentsCount: 0,
      },
      {
        averageScore: 0,
        period: 12,
        periodEnd: '2020-12-31',
        periodStart: '2020-12-01',
        studentsCount: 0,
      },
    ]);
  });
});
