import dayjs from 'dayjs';

const generateSchoolYears = (): readonly {
  readonly value: number;
  readonly label: string;
}[] => {
  let yearsOptions = [];
  const START_YEAR = 2020;
  const currentYear = new Date().getFullYear();

  for (let year = START_YEAR; year <= currentYear; year++) {
    const schoolYear = { value: year, label: `${year} / ${year + 1}` };

    yearsOptions.push(schoolYear);
  }

  return yearsOptions;
};

export const schoolYearsOptions = generateSchoolYears();

export const getInitialSchoolYear = (schoolYearStartDate: { day: number; month: number }) => {
  const startYearDate = dayjs()
    .set('month', schoolYearStartDate.month - 1)
    .set('date', schoolYearStartDate.day);

  const currentYear = new Date().getFullYear();
  const schoolYear = dayjs().isBefore(startYearDate) ? currentYear - 1 : currentYear;

  return (
    schoolYearsOptions.find((schoolYearOption) => schoolYearOption.value === schoolYear) ?? null
  );
};
