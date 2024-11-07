import { getStackedValues } from './helpers';

describe('getStackedValues', () => {
  it('should map pathwayRecommendationCounts to an array of objects with id and value properties', () => {
    const pathwayRecommendationCounts = [
      { recommendationsCount: 5, pathway: { id: '1', name: 'Pathway 1' } },
      { recommendationsCount: 10, pathway: { id: '2', name: 'Pathway 2' } },
    ];

    const expected = [
      { id: '1', value: 5 },
      { id: '2', value: 10 },
    ];

    expect(getStackedValues(pathwayRecommendationCounts)).toEqual(expected);
  });
});
