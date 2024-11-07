import { groupBy } from '@pbl/utils/groupBy';

describe('groupBy', () => {
  const objectsToGroup = [
    {
      a: 'a',
      b: 'b',
      c: 'c',
    },
    {
      a: 'a1',
      b: 'b',
      c: 'c',
    },
    {
      a: 'a2',
      b: 'b',
      c: 'c',
    },
    {
      a: 'a',
      b: 'b1',
      c: 'c3',
    },
    {
      a: 'a1',
      b: 'b1',
      c: 'c3',
    },
    {
      a: 'a1',
      b: '2',
      c: 'c5',
    },
  ];
  it('groups by one element', () => {
    const objectGrouped = [
      {
        b: 'b',
        items: [
          {
            a: 'a',
            b: 'b',
            c: 'c',
          },
          {
            a: 'a1',
            b: 'b',
            c: 'c',
          },
          {
            a: 'a2',
            b: 'b',
            c: 'c',
          },
        ],
      },
      {
        b: 'b1',
        items: [
          {
            a: 'a',
            b: 'b1',
            c: 'c3',
          },
          {
            a: 'a1',
            b: 'b1',
            c: 'c3',
          },
        ],
      },
      {
        b: '2',
        items: [
          {
            a: 'a1',
            b: '2',
            c: 'c5',
          },
        ],
      },
    ];
    const result = groupBy(objectsToGroup, ['b']);

    expect(result).toHaveLength(3);
    expect(result).toEqual(objectGrouped);
  });
  it('groups by two elements', () => {
    const objectGrouped = [
      {
        b: 'b',
        c: 'c',
        items: [
          {
            a: 'a',
            b: 'b',
            c: 'c',
          },
          {
            a: 'a1',
            b: 'b',
            c: 'c',
          },
          {
            a: 'a2',
            b: 'b',
            c: 'c',
          },
        ],
      },
      {
        b: 'b1',
        c: 'c3',
        items: [
          {
            a: 'a',
            b: 'b1',
            c: 'c3',
          },
          {
            a: 'a1',
            b: 'b1',
            c: 'c3',
          },
        ],
      },
      {
        b: '2',
        c: 'c5',
        items: [
          {
            a: 'a1',
            b: '2',
            c: 'c5',
          },
        ],
      },
    ];
    const result = groupBy(objectsToGroup, ['b', 'c']);

    expect(result).toHaveLength(3);
    expect(result).toEqual(objectGrouped);
  });
  it('return the same value when empty array of groupBy values provided', () => {
    const result = groupBy(objectsToGroup, []);

    expect(result).toEqual(result);
  });
  it('return the same value when wrong keys to group by are provided', () => {
    const result = groupBy(objectsToGroup, ['d', 'p']);

    expect(result).toEqual(result);
  });
});
