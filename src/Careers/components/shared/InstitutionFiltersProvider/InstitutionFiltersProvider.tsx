import React, { createContext, ReactNode, useContext, useMemo, useReducer } from 'react';
import qs from 'qs';
import { isEmpty, values, isNil } from 'lodash-es';
import { useHistory } from 'react-router-dom';
import { MultiValue } from 'react-select';

import {
  APPLICATIONS_TYPE,
  COST_RANGES,
  INSTITUTION_TYPES,
  SIZE_TYPES,
  US_STATES,
} from '@dc/resources/enums';

type Props = {
  children: ReactNode;
  postSecondaryApplicationsEnabled?: boolean;
};

type USStatesList = keyof typeof US_STATES;
type InstitutionTypeList = keyof typeof INSTITUTION_TYPES;
type InstitutionSizeTypeList = keyof typeof SIZE_TYPES;
type InstitutionCostRangeList = keyof typeof COST_RANGES;
type ApplicationsTypeList = keyof typeof APPLICATIONS_TYPE;

export type LocationSelectOption = { value: USStatesList; label: string };
export type TypeSelectOption = { value: InstitutionTypeList; label: string };
export type InstitutionSizeOption = { value: InstitutionSizeTypeList; label: string };
export type InstitutionCostRangeOption = { value: InstitutionCostRangeList; label: string };

type FiltersState = {
  applicationsType?: ApplicationsTypeList;
  keyword?: string;
  type?: InstitutionTypeList[];
  location?: USStatesList[];
  size?: InstitutionSizeTypeList[];
  cost?: InstitutionCostRangeList[];
};

type FilterAction =
  | { type: 'set-applications-type'; payload?: APPLICATIONS_TYPE }
  | { type: 'set-keyword'; payload?: string }
  | { type: 'set-location'; payload: USStatesList[] }
  | { type: 'set-type'; payload: InstitutionTypeList[] }
  | { type: 'set-all-filters'; payload: FiltersState }
  | { type: 'set-size'; payload: InstitutionSizeTypeList[] }
  | { type: 'set-cost'; payload: InstitutionCostRangeList[] }
  | { type: 'reset' };

type InstitutionFilterContextType = {
  dispatch: React.Dispatch<FilterAction>;
  filtersAsQuery: string;
  setKeyword: (keyword: string) => void;
  setLocation: (location: MultiValue<LocationSelectOption>) => void;
  setType: (type: MultiValue<TypeSelectOption>) => void;
  setSize: (size: MultiValue<InstitutionSizeOption>) => void;
  setCost: (cost: MultiValue<InstitutionCostRangeOption>) => void;
  setApplicationsType: (applicationType: boolean) => void;
  resetAllFilters: () => void;
  showCommonAppFilter: boolean;
  isAnyFiltersApplied: boolean;
  filters: {
    commonAppEnabledEq?: boolean;
    searchableColumnsCont?: string;
    stateIn?: USStatesList[];
    typeIn?: InstitutionTypeList[];
    sizeTypeIn?: InstitutionSizeTypeList[];
    costRange?: InstitutionCostRangeList[];
  };
};

const InstitutionFilterContext = createContext<InstitutionFilterContextType>({
  dispatch: () => {},
  filtersAsQuery: '',
  setKeyword: () => {},
  setLocation: () => {},
  setType: () => {},
  resetAllFilters: () => {},
  setSize: () => {},
  setCost: () => {},
  setApplicationsType: () => {},
  isAnyFiltersApplied: false,
  showCommonAppFilter: false,
  filters: {
    searchableColumnsCont: '',
    stateIn: undefined,
    typeIn: undefined,
    sizeTypeIn: undefined,
    costRange: undefined,
    commonAppEnabledEq: undefined,
  },
});

const initialFiltersState = {
  keyword: undefined,
  location: undefined,
  type: undefined,
  size: undefined,
  cost: undefined,
  applicationsType: undefined,
};

const filtersReducer = (state: FiltersState, action: FilterAction): FiltersState => {
  switch (action.type) {
    case 'set-keyword': {
      return { ...state, keyword: action.payload };
    }
    case 'set-location': {
      return { ...state, location: action.payload };
    }
    case 'set-type': {
      return { ...state, type: action.payload };
    }
    case 'set-all-filters': {
      return action.payload;
    }
    case 'set-size': {
      return { ...state, size: action.payload };
    }
    case 'set-cost': {
      return { ...state, cost: action.payload };
    }
    case 'set-applications-type': {
      return { ...state, applicationsType: action.payload };
    }
    case 'reset': {
      return initialFiltersState;
    }
    default:
      return initialFiltersState;
  }
};

export const InstitutionFiltersProvider = ({
  children,
  postSecondaryApplicationsEnabled,
}: Props) => {
  const { location } = useHistory();

  const initialFilters = qs.parse(location.search.replace('?', ''));

  const [state, dispatch] = useReducer(filtersReducer, initialFilters);

  const filtersAsQuery = qs.stringify(state, {
    encode: false,
    arrayFormat: 'brackets',
    filter: (prefix, value) => value || undefined,
  });

  const setKeyword = (keywordToSet: string) => {
    dispatch({ type: 'set-keyword', payload: keywordToSet });
  };

  const setLocation = (locationsToSet: MultiValue<LocationSelectOption>) => {
    dispatch({ type: 'set-location', payload: locationsToSet.map((location) => location.value) });
  };

  const resetAllFilters = () => {
    dispatch({ type: 'reset' });
  };

  const setType = (typesToSet: MultiValue<TypeSelectOption>) => {
    dispatch({ type: 'set-type', payload: typesToSet?.map((type) => type.value) });
  };

  const setSize = (sizesToSet: MultiValue<InstitutionSizeOption>) => {
    dispatch({ type: 'set-size', payload: sizesToSet?.map((size) => size.value) });
  };

  const setCost = (costsToSet: MultiValue<InstitutionCostRangeOption>) => {
    dispatch({ type: 'set-cost', payload: costsToSet?.map((cost) => cost.value) });
  };

  const setApplicationsType = (applicationsType?: boolean) => {
    const applicationsTypeToSet = applicationsType ? APPLICATIONS_TYPE.COMMON_APP : undefined;

    dispatch({ type: 'set-applications-type', payload: applicationsTypeToSet });
  };

  const filters = useMemo(() => {
    const commonAppEnabledEq =
      state.applicationsType === APPLICATIONS_TYPE.COMMON_APP ? true : undefined;

    return {
      searchableColumnsCont: state.keyword,
      stateIn: state.location,
      typeIn: state.type,
      sizeTypeIn: state.size,
      costRange: state.cost,
      commonAppEnabledEq,
    };
  }, [state]);

  const isAnyFiltersApplied = values(filters).some((filter) => {
    if (typeof filter === 'boolean') {
      return !isNil(filter);
    }

    return !isEmpty(filter);
  });

  const value = useMemo(
    () => ({
      dispatch,
      setKeyword,
      setLocation,
      setType,
      resetAllFilters,
      setSize,
      setCost,
      setApplicationsType,
      filtersAsQuery,
      isAnyFiltersApplied,
      showCommonAppFilter: !!postSecondaryApplicationsEnabled,
      filters,
    }),
    [dispatch, filtersAsQuery, filters]
  );

  return (
    <InstitutionFilterContext.Provider value={value}>{children}</InstitutionFilterContext.Provider>
  );
};

export const useInstitutionFilters = () => useContext(InstitutionFilterContext);
