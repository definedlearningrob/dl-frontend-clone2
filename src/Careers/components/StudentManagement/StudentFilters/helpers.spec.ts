import {
  flatEntities,
  getGradYearOptions,
} from '@dc/components/StudentManagement/StudentFilters/helpers';

describe('helpers', () => {
  describe('flatEntities', () => {
    it('should flat 5-level deep nested entities', () => {
      const data = {
        __typename: 'EntityPage',
        pagesCount: 1,
        nodesCount: 1,
        nodes: [
          {
            __typename: 'Entity',
            uuid: '1',
            name: 'Level 1',
            children: {
              __typename: 'EntityPage',
              nodes: [
                {
                  __typename: 'Entity',
                  uuid: '2',
                  name: 'Level 2',
                  children: {
                    __typename: 'EntityPage',
                    nodes: [
                      {
                        __typename: 'Entity',
                        uuid: '3',
                        name: 'Level 3',
                        children: {
                          __typename: 'EntityPage',
                          nodes: [
                            {
                              __typename: 'Entity',
                              uuid: '4',
                              name: 'Level 4',
                              children: {
                                __typename: 'EntityPage',
                                nodes: [
                                  {
                                    __typename: 'Entity',
                                    uuid: '5',
                                    name: 'Level 5',
                                    children: {
                                      __typename: 'EntityPage',
                                      nodes: [],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      };

      const expected = [
        { uuid: '1', name: 'Level 1', level: 0 },
        { uuid: '2', name: 'Level 2', level: 1 },
        { uuid: '3', name: 'Level 3', level: 2 },
        { uuid: '4', name: 'Level 4', level: 3 },
        { uuid: '5', name: 'Level 5', level: 4 },
      ];

      expect(flatEntities(data)).toEqual(expected);
    });
  });

  describe('getGradYearOptions', () => {
    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date(2020, 2, 22, 6, 24, 23));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should return 5 years from current year', () => {
      const expected = [
        { value: 2020, label: '2020' },
        { value: 2021, label: '2021' },
        { value: 2022, label: '2022' },
        { value: 2023, label: '2023' },
        { value: 2024, label: '2024' },
        { value: 2025, label: '2025' },
      ];

      expect(getGradYearOptions()).toEqual(expected);
    });
  });
});
