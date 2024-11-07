import { useReportFilters } from '@shared/components/ReportFiltersProvider/ReportFiltersProvider';
import { ALL_OPTION } from '@shared/components/MultiSelect';

export type Option<T = string> = { label: string; value: T };

type PlanReportFilters = {
  plan: Option | null;
  entities: Option[];
  gradeLevels: Option[];
  users: Option[];
  schoolClasses: Option[];
  entityFilter: string;
  userFilter: string;
  schoolClassFilter: string;
  schoolYear: Option<number> | null;
};

const getFilterValue = (options: Option<string>[]) => {
  const isAllPlaceholderSelected = options.length === 1 && options[0].value === ALL_OPTION.value;

  if (isAllPlaceholderSelected) return null;

  return options.map((option) => option.value);
};

const getCommonFilters = (rawFilters: PlanReportFilters) => {
  const entityUuids = getFilterValue(rawFilters.entities);
  const gradeLevels = getFilterValue(rawFilters.gradeLevels);
  const userUuids = getFilterValue(rawFilters.users);

  return {
    ...(entityUuids && { entityUuids }),
    ...(gradeLevels && { gradeLevels }),
    ...(userUuids && { userUuids }),
  };
};

export const usePlanReportFilters = () => {
  const { filters, appliedFilters, ...rest } = useReportFilters<PlanReportFilters>();

  const variablesForFilters = {
    planId: filters.plan?.value ?? '',
    filters: getCommonFilters(filters),
    entityFilter: { nameCont: filters.entityFilter },
    userFilter: { fullNameCont: filters.userFilter },
    schoolClassFilter: { nameCont: filters.schoolClassFilter },
  };

  const variables = {
    filter: {
      planId: appliedFilters.plan?.value || '',
      schoolYear: appliedFilters.schoolYear?.value,
      schoolClassUuids: getFilterValue(appliedFilters.schoolClasses),
      ...getCommonFilters(appliedFilters),
    },
  };

  return { filters, appliedFilters, variablesForFilters, variables, ...rest };
};
