import { getTeachersMap } from '@shared/utils/getTeachersMap';

describe('utils | getTeachersMap', () => {
  it('should return an empty object when given undefined', () => {
    expect(getTeachersMap(undefined)).toEqual({});
  });

  it('should return an empty object when given an empty array', () => {
    expect(getTeachersMap([])).toEqual({});
  });

  it('should map school classes with teacher full names', () => {
    const input = [
      {
        uuid: 'class-1',
        name: 'Math Class',
        users: {
          nodes: [{ fullName: 'John Doe' }, { fullName: 'Jane Smith' }, { fullName: null }],
        },
      },
      {
        uuid: 'class-2',
        name: 'Science Class',
        users: {
          nodes: [{ fullName: null }, { fullName: 'Jack Brown' }],
        },
      },
    ];

    const expectedOutput = {
      'class-1': ['John Doe', 'Jane Smith'],
      'class-2': ['Jack Brown'],
    };

    expect(getTeachersMap(input)).toEqual(expectedOutput);
  });

  it('should handle cases where users is null', () => {
    const input = [
      {
        uuid: 'class-3',
        name: 'History Class',
        users: null,
      },
    ];

    expect(getTeachersMap(input)).toEqual({});
  });

  it('should handle cases where nodes is an empty array', () => {
    const input = [
      {
        uuid: 'class-4',
        name: 'Art Class',
        users: { nodes: [] },
      },
    ];

    expect(getTeachersMap(input)).toEqual({ 'class-4': [] });
  });
});
