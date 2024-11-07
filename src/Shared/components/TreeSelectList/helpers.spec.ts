import { flattenOptions } from './helpers';

describe('flattenOptions', () => {
  const options = [
    {
      value: '1',
      label: '1',
      children: [
        { value: '11', label: '11', children: [{ value: '111', label: '111', children: [] }] },
        { value: '12', label: '12', children: [] },
      ],
    },
    { value: '2', label: '2', children: [] },
  ];

  it('flattens nested options to be one level deep', () => {
    const flattenedOptions = flattenOptions(options);

    expect(flattenedOptions).toEqual([
      { children: [], label: '1', value: '1' },
      { children: [], label: '11', value: '11' },
      { children: [], label: '111', value: '111' },
      { children: [], label: '12', value: '12' },
      { children: [], label: '2', value: '2' },
    ]);
  });
});
