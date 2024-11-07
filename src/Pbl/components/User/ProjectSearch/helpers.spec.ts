import { sortGrades } from '@pbl/components/User/ProjectSearch/helpers';

describe('project search helpers', () => {
  it(' sortGrades should sort and return sorted grades', () => {
    const grades = ['1', '2', 'K', '3', '4', '5'];
    const sortedGrades = sortGrades(grades);

    expect(sortedGrades).toEqual(['K', '1', '2', '3', '4', '5']);
  });
});
