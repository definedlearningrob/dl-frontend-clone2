import { TRACK_GRADES } from '@shared/resources/constants';

import { ToStringLiteral } from './types';

type Grade = ToStringLiteral<typeof TRACK_GRADES>;

type TRangeObject = {
  start: Grade;
  end: Grade;
};

export const groupGradesByRange = (grades: Grade[]) => {
  const getProperPrevValue = (val: Grade) => {
    if (val === TRACK_GRADES['POST-SECONDARY']) {
      return TRACK_GRADES['12'];
    }
    if (val === TRACK_GRADES.K) {
      return TRACK_GRADES['PRE-K'];
    }
    if (val === TRACK_GRADES['1']) {
      return TRACK_GRADES.K;
    }
    if (parseInt(val)) {
      return `${parseInt(val) - 1}`;
    }
  };

  const checkPrevValPartOfRange = (val: Grade, prevVal: Grade) => {
    const properPrevValue = getProperPrevValue(val);

    return properPrevValue === prevVal;
  };

  return grades.reduce((acc: TRangeObject[], current: Grade, index: number, array: Grade[]) => {
    const prevValue = array[index - 1];

    if (!prevValue) return [{ start: current, end: current }];

    const isPrevValuePartOfRange = checkPrevValPartOfRange(current, prevValue);

    if (isPrevValuePartOfRange) {
      const lastRange = acc[acc.length - 1];
      const withoutLastRange = acc.slice(0, acc.length - 1);

      return [...withoutLastRange, { start: lastRange.start, end: current }];
    }

    return [...acc, { start: current, end: current }];
  }, []);
};
