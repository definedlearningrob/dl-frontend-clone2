import { createContext, ReactNode, useContext } from 'react';
import { FetchResult } from '@apollo/client';

import { UpdateRubricHeadingDCData } from '@dc/graphql/user/mutations/updateRubricHeading';

import { UpdateRubricHeadingDLData } from '@pbl/graphql/user/mutations/updateRubricHeading';

import { RubricCriteria, RubricData, RubricEdit } from '../utils/types';
import { prepareTableData } from '../utils/prepareTableData';

import { useRubricEditing } from './useRubricEditing';

type TRubricContext = {
  editing: {
    addColumn: () => Promise<void>;
    addRow: () => Promise<void>;
    criteria: {
      handleSubmit: (
        criteria: RubricCriteria,
        setErrors?: (error: unknown) => Promise<void>,
        callback?: () => void
      ) => void;
    };
    criteriaLabel: {
      handleDelete: (id: string) => Promise<void>;
      handleSubmit: (
        { id, score, displayName }: { id: string; score: any; displayName: string },
        callback?: () => void,
        setErrors?: (error: unknown) => void
      ) => Promise<void>;
    };
    heading: {
      handleDelete: (id: string) => Promise<void>;
      handleSubmit: ({
        id,
        name,
        multiplier,
      }: {
        id: string;
        name: string;
        multiplier: number;
        tagIds?: string[];
      }) =>
        | Promise<FetchResult<UpdateRubricHeadingDCData>>
        | Promise<FetchResult<UpdateRubricHeadingDLData>>;
    };
    hoveredColumnId: string | null;
    setHoveredColumnId: (id: string | null) => void;
  };
  rubric: RubricData;
};

type Props = {
  children: ReactNode;
  rubric: RubricData | RubricEdit;
};

const RubricsGradingContext = createContext<TRubricContext>({} as TRubricContext);

export const RubricsEditorProvider = ({ children, rubric }: Props) => {
  const parsedRubric = prepareTableData(rubric);

  const {
    addColumn,
    addRow,
    handleCriteriaLabelDelete,
    handleCriteriaLabelSubmit,
    handleCriteriaSubmit,
    handleHeadingDelete,
    handleHeadingSubmit,
    hoveredColumnId,
    setHoveredColumnId,
  } = useRubricEditing(parsedRubric);

  return (
    <RubricsGradingContext.Provider
      value={{
        editing: {
          addColumn,
          addRow,
          criteria: {
            handleSubmit: handleCriteriaSubmit,
          },
          criteriaLabel: {
            handleDelete: handleCriteriaLabelDelete,
            handleSubmit: handleCriteriaLabelSubmit,
          },
          heading: {
            handleDelete: handleHeadingDelete,
            handleSubmit: handleHeadingSubmit,
          },
          hoveredColumnId,
          setHoveredColumnId,
        },
        rubric: parsedRubric,
      }}>
      {children}
    </RubricsGradingContext.Provider>
  );
};

export const useRubricEditor = <T extends RubricData | RubricEdit>() => {
  const { rubric, ...rest } = useContext(RubricsGradingContext);

  return { rubric: rubric as T, ...rest };
};
