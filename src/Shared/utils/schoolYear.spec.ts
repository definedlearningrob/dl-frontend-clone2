import { schoolYearsOptions } from './schoolYear';

describe('generateSchoolYears', () => {
  it('should generate years starting from 2020 to current year +1', () => {
    const startYearOption = { label: '2020 / 2021', value: 2020 };
    const currentYear = new Date().getFullYear();
    const currentYearOption = { label: `${currentYear} / ${currentYear + 1}`, value: currentYear };

    expect(schoolYearsOptions).toContainEqual(startYearOption);
    expect(schoolYearsOptions).toContainEqual(currentYearOption);
  });
});
