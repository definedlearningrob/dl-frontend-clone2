import { formatDateTime } from '@shared/utils/date/date';

describe('formatDateTime', () => {
  it('should format the date with default options', () => {
    const formattedDate = formatDateTime('2022-08-18T03:12:00');
    expect(formattedDate).toEqual('Aug 18, 2022');
  });

  it('should format date with time', () => {
    const formattedDate = formatDateTime('2022-08-18T03:12:00', { withTime: true });
    expect(formattedDate).toEqual('August 18, 2022, 03:12 AM');
  });

  it('should format date when custom format is passed', () => {
    const formattedDate = formatDateTime('2022-08-18T03:12:00', { dateFormat: 'YYYY-MM-DD' });
    expect(formattedDate).toEqual('2022-08-18');
  });

  it('should format date with time when custom format is passed', () => {
    const formattedDate = formatDateTime('2022-08-18T03:12:00', {
      withTime: true,
      dateTimeFormat: 'MMM DD, YYYY, H:mm',
    });
    expect(formattedDate).toEqual('Aug 18, 2022, 3:12');
  });
});
