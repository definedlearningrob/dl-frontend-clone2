import { isEmpty } from 'lodash-es';
import { useState } from 'react';

import { omitTypename } from '@shared/utils/omitTypename';

import { RubricData } from '../utils/types';
type RowValue = {
  criteriaId: string;
  trait?: string;
};

type GradingRows = {
  [key: string]: RowValue | undefined;
};
const getInitialState = (
  headings: RubricData['headings'],
  initialResults: RowValue[]
): GradingRows => {
  const parsedResults = initialResults.map((result) => omitTypename(result));
  const pairs = headings.map((heading, index) => [
    heading.id,
    !isEmpty(parsedResults) ? parsedResults[index] : undefined,
  ]);

  return Object.fromEntries(pairs);
};

export const useRubricGrading = (rubric: RubricData, initialResults: RowValue[]) => {
  const initialState = getInitialState(rubric.headings, initialResults);
  const [gradingRows, setGradingRows] = useState<GradingRows>(initialState);

  const setGradingRow = (rowIndex: string, value: RowValue) => {
    setGradingRows((prev) => ({ ...prev, [rowIndex]: value }));
  };

  const getGradingRow = (rowIndex: string) => gradingRows[rowIndex];

  const resetGradingRows = () => {
    setGradingRows(initialState);
  };

  const results = Object.values(gradingRows).filter((row) => !isEmpty(row)) as RowValue[];
  const isFullyGraded = Object.values(gradingRows).every((row) => !isEmpty(row));

  return { isFullyGraded, results, getGradingRow, setGradingRow, resetGradingRows };
};
