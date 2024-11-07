import {
  Context,
  PropsWithChildren,
  Provider,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { noop } from 'lodash-es';

import {
  FilterContextProps,
  Filters,
  FilterProvider,
  useFilters,
} from '@shared/components/FilterProvider/FilterProvider';

interface ReportFiltersContextProps<T extends Filters, K extends keyof T = keyof T>
  extends FilterContextProps<T, K> {
  appliedFilters: T;
  submitFilters: () => void;
}

const ReportFiltersContext = createContext<ReportFiltersContextProps<Filters> | null>(null);

type FilterProviderProps<T> = PropsWithChildren<{
  initialFilters: T;
  onFilterChange?: (filters: T) => void;
}>;

const ReportFiltersProviderContent = <T extends Filters = Filters>({
  children,
}: PropsWithChildren<{}>) => {
  const filtersValue = useFilters<T>();
  const { setFilters, filters } = filtersValue;
  const [appliedFilters, setAppliedFilters] = useState(filtersValue.filters);

  const ProviderComponent = ReportFiltersContext.Provider as unknown as Provider<
    FilterContextProps<T>
  >;

  const submitFilters = useCallback(() => {
    setAppliedFilters(filters);
  }, [filters]);

  const handleResetFilters = useCallback(() => {
    setFilters(appliedFilters);
  }, [appliedFilters, setFilters]);

  const value = useMemo(
    () => ({ ...filtersValue, appliedFilters, submitFilters, resetFilters: handleResetFilters }),
    [filtersValue, appliedFilters, submitFilters]
  );

  return <ProviderComponent value={value}>{children}</ProviderComponent>;
};

export const ReportFiltersProvider = <T extends Filters = Filters>({
  children,
  initialFilters,
  onFilterChange = noop,
}: FilterProviderProps<T>) => (
  <FilterProvider initialFilters={initialFilters} onFilterChange={onFilterChange}>
    <ReportFiltersProviderContent<T>>{children}</ReportFiltersProviderContent>
  </FilterProvider>
);

export const useReportFilters = <T extends Filters>() => {
  type ContextProps = ReportFiltersContextProps<T> | null;

  const context = useContext(ReportFiltersContext as Context<ContextProps>);

  if (!context) {
    throw new Error('used outside provider');
  }

  return context;
};
