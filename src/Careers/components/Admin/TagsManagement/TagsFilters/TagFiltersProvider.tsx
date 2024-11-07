import React, { createContext, ReactNode, useMemo, useReducer, useContext } from 'react';

import { TagTypes } from '@dc/resources/enums';

enum ACTION_TYPES {
  SET_KEYWORD = 'set-keyword',
}

type Props = {
  children: ReactNode;
};

type FiltersState = {
  nameCont?: string;
  typeEq?: string;
};
type FilterAction = { type: ACTION_TYPES.SET_KEYWORD; payload?: string };

type TagFiltersContextType = {
  dispatch: React.Dispatch<FilterAction>;
  setKeyword: (value: string) => void;
  filters: {
    nameCont: string | undefined;
    typeEq: string | undefined;
  };
};

const initialFiltersState = {
  nameCont: '',
  typeEq: TagTypes.SYSTEM,
};

const TagFiltersContext = createContext<TagFiltersContextType>({
  dispatch: () => {},
  setKeyword: () => {},
  filters: initialFiltersState,
});

const reducer = (state: FiltersState, action: FilterAction) => {
  switch (action.type) {
    case ACTION_TYPES.SET_KEYWORD:
      return { ...state, nameCont: action.payload };

    default:
      return state;
  }
};

export const TagFiltersProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialFiltersState);
  const setKeyword = (value: string) => {
    dispatch({ type: ACTION_TYPES.SET_KEYWORD, payload: value });
  };

  const filters = useMemo(
    () => ({
      nameCont: state.nameCont,
      typeEq: state.typeEq,
    }),
    [state]
  );

  const value = useMemo(
    () => ({
      setKeyword,
      filters,
      dispatch,
    }),
    [filters]
  );

  return <TagFiltersContext.Provider value={value}>{children}</TagFiltersContext.Provider>;
};

export const useTagFilters = () => {
  const context = useContext(TagFiltersContext);

  if (context === undefined) {
    throw new Error('useTagFilters must be used within a TagFiltersProvider');
  }

  return context;
};
