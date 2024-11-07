import dayjs from 'dayjs';

type Params = {
  day: number;
  month: number;
};

export const getRangeInitialDates = ({ day, month }: Params) => {
  const currentDate = dayjs().startOf('day');

  const startDay = day;
  const startMonth = month - 1;

  const referenceDate = dayjs().set('date', startDay).set('month', startMonth).startOf('day'); // month is 0-indexed

  const startDate = currentDate.isBefore(referenceDate)
    ? dayjs(referenceDate).subtract(1, 'year').startOf('day').toISOString()
    : dayjs(referenceDate).startOf('day').toISOString();

  const endDate = dayjs(currentDate).toISOString();

  return {
    startDate: new Date(startDate),
    endDate: new Date(endDate),
  };
};
