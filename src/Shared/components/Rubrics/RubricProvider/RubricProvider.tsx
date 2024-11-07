import { createContext, ReactNode, useContext, useEffect } from 'react';

import { RubricData } from '../utils/types';
import { RUBRIC_TYPE } from '../utils/enums';
import { prepareTableData } from '../utils/prepareTableData';

import { useRubricGrading } from './useRubricGrading';

type Grader = {
  firstName: string;
  lastName: string;
};

type TRubricContext = {
  type: {
    type: RUBRIC_TYPE;
    isGrading: boolean;
    isViewing: boolean;
    isPreview: boolean;
  };
  grading: {
    isFullyGraded: boolean;
    grader?: Grader;
    results: RowValue[];
    getGradingRow: (rowIndex: string) => RowValue | undefined;
    setGradingRow: (rowIndex: string, value: RowValue) => void;
  };
  rubric: RubricData;
};

type Props = {
  initialResults?: RowValue[];
  grader?: Grader;
  children: ReactNode;
  rubric: RubricData;
  type: RUBRIC_TYPE;
};

type RowValue = {
  criteriaId: string;
  trait?: string;
};

const RubricsGradingContext = createContext<TRubricContext>({} as TRubricContext);

export const RubricProvider = ({ children, grader, initialResults = [], rubric, type }: Props) => {
  const isGrading = type === RUBRIC_TYPE.GRADER;
  const isViewing = type === RUBRIC_TYPE.VIEWER;
  const isPreview = type === RUBRIC_TYPE.PREVIEW;

  const parsedRubric = prepareTableData(rubric);

  const { isFullyGraded, results, getGradingRow, setGradingRow, resetGradingRows } =
    useRubricGrading(parsedRubric, initialResults);

  useEffect(() => {
    resetGradingRows();
  }, [rubric]);

  return (
    <RubricsGradingContext.Provider
      value={{
        type: {
          isGrading,
          isViewing,
          isPreview,
          type,
        },
        grading: {
          isFullyGraded,
          grader,
          results,
          getGradingRow,
          setGradingRow,
        },
        rubric: parsedRubric,
      }}>
      {children}
    </RubricsGradingContext.Provider>
  );
};

export const useRubric = <T extends RubricData>() => {
  const { rubric, ...rest } = useContext(RubricsGradingContext);

  return { rubric: rubric as T, ...rest };
};
