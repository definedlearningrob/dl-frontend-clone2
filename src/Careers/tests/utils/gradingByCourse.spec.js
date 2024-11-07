import { getListItemsWithGradingNeededByCourse } from '@dc/utils/gradingByCourse';

const schoolClassesWithGradingNeeded = [
  {
    name: 'Class 1',
    parentName: 'Harvard University',
    uuid: '18dfa13e-e6d7-4f29-b3be-4bbfb528b3a4',
  },
];

const schoolClassesWithoutGradingNeeded = [
  {
    name: 'Class 2',
    parentName: 'Harvard University',
    uuid: '5e6b6df1-d893-4245-a0d3-292628cd9fac',
  },
  {
    name: 'Class 3',
    parentName: 'Harvard University',
    uuid: 'bb01a620-0639-4b7e-808c-e6659ff27803',
  },
];

const expectedResult = [
  {
    gradingByCourseNeeded: true,
    name: 'Class 1',
    parentName: 'Harvard University',
    uuid: '18dfa13e-e6d7-4f29-b3be-4bbfb528b3a4',
  },
  {
    name: 'Class 2',
    parentName: 'Harvard University',
    uuid: '5e6b6df1-d893-4245-a0d3-292628cd9fac',
  },
  {
    name: 'Class 3',
    parentName: 'Harvard University',
    uuid: 'bb01a620-0639-4b7e-808c-e6659ff27803',
  },
];

describe('utils | gradingByCourse', () => {
  it(`getListItemsWithGradingNeededByCourse adds "gradingByCourseNeeded" field to SchoolClasses or Students,
  which need grading and it returns correct array of data`, () => {
    expect(
      getListItemsWithGradingNeededByCourse(
        schoolClassesWithGradingNeeded,
        schoolClassesWithoutGradingNeeded
      )
    ).toStrictEqual(expectedResult);
  });
});
