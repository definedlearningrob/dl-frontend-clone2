import { TRACK_GRADES } from '@shared/resources/constants';
import { groupGradesByRange } from '@shared/utils/groupGradesByRange';

describe('groupGradesByRange', () => {
  it('groups properly', () => {
    const firstGrades = [
      TRACK_GRADES['PRE-K'],
      TRACK_GRADES.K,
      TRACK_GRADES[6],
      TRACK_GRADES[7],
      TRACK_GRADES[8],
      TRACK_GRADES['POST-SECONDARY'],
    ];

    expect(groupGradesByRange(firstGrades)).toEqual([
      { start: 'PRE-K', end: 'K' },
      { start: '6', end: '8' },
      { start: 'POST-SECONDARY', end: 'POST-SECONDARY' },
    ]);

    const secondGrades = [
      TRACK_GRADES['PRE-K'],
      TRACK_GRADES.K,
      TRACK_GRADES[1],
      TRACK_GRADES[7],
      TRACK_GRADES[8],
      TRACK_GRADES[12],
      TRACK_GRADES['POST-SECONDARY'],
    ];

    expect(groupGradesByRange(secondGrades)).toEqual([
      { start: 'PRE-K', end: '1' },
      { start: '7', end: '8' },
      { start: '12', end: 'POST-SECONDARY' },
    ]);

    const thirdGrades = [
      TRACK_GRADES['PRE-K'],
      TRACK_GRADES.K,
      TRACK_GRADES[6],
      TRACK_GRADES[7],
      TRACK_GRADES[8],
      TRACK_GRADES[9],
      TRACK_GRADES[11],
      TRACK_GRADES[12],
      TRACK_GRADES['POST-SECONDARY'],
    ];

    expect(groupGradesByRange(thirdGrades)).toEqual([
      { start: 'PRE-K', end: 'K' },
      { start: '6', end: '9' },
      { start: '11', end: 'POST-SECONDARY' },
    ]);

    const fourthGrades = [
      TRACK_GRADES['PRE-K'],
      TRACK_GRADES.K,
      TRACK_GRADES[2],
      TRACK_GRADES[3],
      TRACK_GRADES[5],
      TRACK_GRADES[6],
      TRACK_GRADES[7],
      TRACK_GRADES[12],
      TRACK_GRADES['POST-SECONDARY'],
    ];

    expect(groupGradesByRange(fourthGrades)).toEqual([
      { start: 'PRE-K', end: 'K' },
      { start: '2', end: '3' },
      { start: '5', end: '7' },
      { start: '12', end: 'POST-SECONDARY' },
    ]);

    const fifthGrades = [
      TRACK_GRADES['PRE-K'],
      TRACK_GRADES[2],
      TRACK_GRADES[5],
      TRACK_GRADES[7],
      TRACK_GRADES[9],
      TRACK_GRADES[11],
      TRACK_GRADES['POST-SECONDARY'],
    ];

    expect(groupGradesByRange(fifthGrades)).toEqual([
      { start: 'PRE-K', end: 'PRE-K' },
      { start: '2', end: '2' },
      { start: '5', end: '5' },
      { start: '7', end: '7' },
      { start: '9', end: '9' },
      { start: '11', end: '11' },
      { start: 'POST-SECONDARY', end: 'POST-SECONDARY' },
    ]);
  });
});
