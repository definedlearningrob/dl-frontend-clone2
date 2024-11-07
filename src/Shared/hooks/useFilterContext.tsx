import {
  ChangeEvent,
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';

import debounce from '@shared/utils/debounce';

import useQueryParams, { TParams } from './useQueryParams';

const FilterContext = createContext({});

type TProviderProps = PropsWithChildren<{
  omitUrl?: boolean;
  onFilterChange?: (filter?: any) => void;
  defaultFilter?: {
    [key: string]: string;
  };
}>;

const DEBOUNCE_TIME = 700;
const containsKey = 'Cont';
const equalsKey = 'Eq';

const mapStringValue = (value: string) => {
  if (value === 'true') return true;
  if (value === 'false') return false;

  return value;
};

export default function FilterProvider<T extends Record<string, any>>({
  children,
  omitUrl,
  onFilterChange,
  defaultFilter,
}: TProviderProps) {
  const { params, removeQueryParams, updateQueryParams } = useQueryParams<T>();
  const paramNames = Object.keys(params);

  const initialFilter = omitUrl
    ? {}
    : paramNames.reduce((acc, paramName) => {
        const isParamPartOfFilter =
          paramName.includes(containsKey) || paramName.includes(equalsKey);

        return isParamPartOfFilter
          ? //@ts-ignore
            { ...acc, [paramName]: mapStringValue(params[paramName]) }
          : acc;
      }, {});

  const filterParamNames = Object.keys(initialFilter);
  const initialFields = omitUrl
    ? {}
    : filterParamNames.reduce(
        (acc, filterKey) =>
          filterKey.includes(containsKey)
            ? //@ts-ignore
              { ...acc, [filterKey.replace(containsKey, '')]: initialFilter[filterKey] }
            : //@ts-ignore
              { ...acc, [filterKey.replace(equalsKey, '')]: initialFilter[filterKey] },
        {}
      );

  const [fields, setFields] = useState(initialFields);
  const [filter, setFilter] = useState<Partial<T>>({ ...defaultFilter, ...initialFilter });

  const updateFilter = (passedFilter: TParams<T>) => {
    //@ts-ignore
    setFilter(passedFilter);

    if (!omitUrl) {
      //@ts-ignore
      const keysToRemove = Object.keys(passedFilter).filter((key) => passedFilter[key] === null);

      updateQueryParams(passedFilter);
      //@ts-ignore
      keysToRemove.length && removeQueryParams(keysToRemove);
    }

    onFilterChange && onFilterChange(passedFilter);
  };

  const debouncedSetFilter = useCallback(debounce(updateFilter, DEBOUNCE_TIME), [onFilterChange]);

  const handleChange =
    (field: keyof T, { min }: { min?: number } = {}) =>
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      const trimmed = value.trim();

      setFields({ ...fields, [field]: value });

      if (min && min > trimmed.length && trimmed.length > 0) {
        return;
      }

      debouncedSetFilter({ ...filter, [`${String(field)}${containsKey}`]: trimmed });
    };

  const clearFilter = () => {
    //@ts-ignore
    removeQueryParams(Object.keys(filter));
    setFields({});
    setFilter({});
  };

  return (
    <FilterContext.Provider
      value={{
        clearFilter,
        filter,
        fields,
        handleChange,
      }}>
      {children}
    </FilterContext.Provider>
  );
}
export function useFilterContext() {
  return useContext(FilterContext);
}
