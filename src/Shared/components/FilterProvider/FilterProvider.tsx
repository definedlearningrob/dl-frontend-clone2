import { noop } from 'lodash-es';
import React, { Provider, Context, createContext, useContext, useMemo, useState } from 'react';
import { useUpdateEffect } from 'react-use';

type FilterValue =
  | string
  | number
  | string[]
  | number[]
  | boolean
  | null
  | boolean
  | Date
  | Record<string, unknown>
  | Record<string, unknown>[];

export type Filters = Record<string, FilterValue>;

export interface FilterContextProps<T extends Filters, K extends keyof T = keyof T> {
  filters: T;
  setFilters: (filters: T) => void;
  handleFilterChange: (key: K, value: T[K]) => void;
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextProps<Filters> | null>(null);

type FilterProviderProps<T> = React.PropsWithChildren<{
  initialFilters: T;
  onFilterChange?: (filters: T) => void;
}>;

export const FilterProvider = <T extends Filters = Filters>({
  children,
  initialFilters,
  onFilterChange = noop,
}: FilterProviderProps<T>) => {
  const ProviderComponent = FilterContext.Provider as unknown as Provider<FilterContextProps<T>>;
  const [filters, setFilters] = useState(initialFilters);

  useUpdateEffect(() => {
    onFilterChange(filters);
  }, [filters]);

  const handleFilterChange = <K extends keyof T>(key: K, value: T[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const value = useMemo(
    () => ({
      filters,
      setFilters,
      handleFilterChange,
      resetFilters,
    }),
    [filters]
  );

  return <ProviderComponent value={value}>{children}</ProviderComponent>;
};

export const useFilters = <T extends Filters>() => {
  type ContextProps = FilterContextProps<T> | null;

  const context = useContext(FilterContext as Context<ContextProps>);

  if (!context) {
    throw new Error('used outside provider');
  }

  return context;
};
