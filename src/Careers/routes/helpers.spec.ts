import { getRangeInitialDates } from './helpers';

describe('getRangeInitialDates', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const input = { day: 1, month: 7 }; // 1st July

  it('should return correct dates when current date is before reference date', () => {
    jest.setSystemTime(new Date(2024, 1, 1).getTime()); // 1st February 2022

    const result = getRangeInitialDates(input);

    const expectedStartDate = new Date(2023, 6, 1);
    const expectedEndDate = new Date(2024, 1, 1);

    expect(result.startDate).toEqual(expectedStartDate);
    expect(result.endDate).toEqual(expectedEndDate);
  });

  it('should return correct dates when current date is after reference date', () => {
    jest.setSystemTime(new Date(2024, 10, 1).getTime()); // 1st November 2022

    const result = getRangeInitialDates(input);

    const expectedStartDate = new Date(2024, 6, 1);
    const expectedEndDate = new Date(2024, 10, 1);

    expect(result.startDate).toEqual(expectedStartDate);
    expect(result.endDate).toEqual(expectedEndDate);
  });
});
