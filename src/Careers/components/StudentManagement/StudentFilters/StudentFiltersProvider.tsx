import React, { createContext, ReactNode, useContext, useMemo, useReducer } from 'react';

enum ACTION_TYPES {
  SET_KEYWORD = 'set-keyword',
  SET_ENTITY = 'set-entity',
  SET_GRAD_YEAR = 'set-grad-year',
  SET_COUNSELOR = 'set-counselor',
}

type Props = {
  children: ReactNode;
};

type FiltersState = {
  keyword?: string;
  entity?: string[];
  gradYears?: number[];
  counselor?: string | null;
};

type FilterAction =
  | { type: ACTION_TYPES.SET_KEYWORD; payload?: string }
  | { type: ACTION_TYPES.SET_ENTITY; payload: string[] }
  | { type: ACTION_TYPES.SET_GRAD_YEAR; payload: number[] }
  | { type: ACTION_TYPES.SET_COUNSELOR; payload: string | null };

type StudentFiltersContextType = {
  dispatch: React.Dispatch<FilterAction>;
  setKeyword: (value: string) => void;
  setEntity: (value: string[]) => void;
  setGradYear: (value: number[]) => void;
  setCounselor: (value: string | null) => void;
  filters: {
    searchableColumnsCont?: string;
    entityUuidIn?: string[];
    gradYearIn?: number[];
    counselorUuidEq?: string | null;
  };
};

const StudentFiltersContext = createContext<StudentFiltersContextType>({
  dispatch: () => {},
  setKeyword: () => {},
  setEntity: () => {},
  setGradYear: () => {},
  setCounselor: () => {},
  filters: {
    searchableColumnsCont: '',
    entityUuidIn: undefined,
    gradYearIn: undefined,
    counselorUuidEq: undefined,
  },
});

const initialFiltersState = {
  keyword: '',
  entity: undefined,
  gradYear: undefined,
  counselor: undefined,
};

const reducer = (state: FiltersState, action: FilterAction): FiltersState => {
  switch (action.type) {
    case ACTION_TYPES.SET_KEYWORD: {
      return { ...state, keyword: action.payload };
    }
    case ACTION_TYPES.SET_ENTITY: {
      return { ...state, entity: action.payload };
    }
    case ACTION_TYPES.SET_GRAD_YEAR: {
      return { ...state, gradYears: action.payload };
    }
    case ACTION_TYPES.SET_COUNSELOR: {
      return { ...state, counselor: action.payload };
    }
    default:
      return initialFiltersState;
  }
};

export const StudentFiltersProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialFiltersState);

  const setKeyword = (value: string) => {
    dispatch({ type: ACTION_TYPES.SET_KEYWORD, payload: value });
  };

  const setEntity = (value: string[]) => {
    dispatch({ type: ACTION_TYPES.SET_ENTITY, payload: value });
  };

  const setGradYear = (value: number[]) => {
    dispatch({ type: ACTION_TYPES.SET_GRAD_YEAR, payload: value });
  };

  const setCounselor = (value: string | null) => {
    dispatch({ type: ACTION_TYPES.SET_COUNSELOR, payload: value });
  };

  const filters = useMemo(
    () => ({
      searchableColumnsCont: state.keyword,
      entityUuidIn: state.entity,
      gradYearIn: state.gradYears,
      counselorUuidEq: state.counselor,
    }),
    [state]
  );

  const value = useMemo(
    () => ({
      dispatch,
      setKeyword,
      setEntity,
      setGradYear,
      setCounselor,
      filters,
    }),
    [dispatch, filters]
  );

  return <StudentFiltersContext.Provider value={value}>{children}</StudentFiltersContext.Provider>;
};

export const useStudentFilters = () => useContext(StudentFiltersContext);
