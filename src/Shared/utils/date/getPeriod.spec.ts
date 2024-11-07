import { getPeriod } from '@shared/utils/date/date';

describe('getPeriod', () => {
  it('should return period string', () => {
    const period = getPeriod('2022-08-18T03:12:00', '2022-08-25T03:12:00');

    expect(period).toEqual('Aug 18, 2022 - Aug 25, 2022');
  });
});
