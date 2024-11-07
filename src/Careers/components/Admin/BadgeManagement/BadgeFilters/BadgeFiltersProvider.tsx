import React, { createContext, ReactNode, useContext, useMemo, useReducer } from 'react';

enum ACTION_TYPES {
  SET_KEYWORD = 'set-keyword',
}

type Props = {
  children: ReactNode;
};

type FiltersState = {
  keyword?: string;
};

type FilterAction = { type: ACTION_TYPES.SET_KEYWORD; payload?: string };

type BadgeFiltersContextType = {
  dispatch: React.Dispatch<FilterAction>;
  setKeyword: (value: string) => void;
  filters: {};
};

const BadgeFiltersContext = createContext<BadgeFiltersContextType>({
  dispatch: () => {},
  setKeyword: () => {},
  filters: {},
});

const initialFiltersState = {
  keyword: '',
};

const reducer = (state: FiltersState, action: FilterAction) => {
  switch (action.type) {
    case ACTION_TYPES.SET_KEYWORD:
      return { ...state, keyword: action.payload };
    default:
      return state;
  }
};
export const BadgeFiltersProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialFiltersState);

  const setKeyword = (value: string) => {
    dispatch({ type: ACTION_TYPES.SET_KEYWORD, payload: value });
  };

  const filters = useMemo(
    () => ({
      nameCont: state.keyword,
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

  return <BadgeFiltersContext.Provider value={value}>{children}</BadgeFiltersContext.Provider>;
};

export const useBadgeFilters = () => useContext(BadgeFiltersContext);
