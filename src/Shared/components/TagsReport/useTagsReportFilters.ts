import { isEmpty } from 'lodash-es';

import { useReportFilters } from '@shared/components/ReportFiltersProvider/ReportFiltersProvider';
import { ALL_OPTION } from '@shared/components/MultiSelect';

export type Option<T = string> = { label: string; value: T };

export type PerformanceIndicatorsReportFilters = {
  tags: Option[];
  entities: Option[];
  gradeLevels: Option[];
  users: Option[];
  schoolClasses: Option[];
  schoolYear: Option<number> | null;
  entityFilter: string;
  userFilter: string;
  schoolClassFilter: string;
};

const getFilterValue = (options: Option[], allSelectedValue: null | [] = null) => {
  if (isEmpty(options)) return [];

  const isAllPlaceholderSelected = options.length === 1 && options[0].value === ALL_OPTION.value;

  if (isAllPlaceholderSelected) return allSelectedValue;

  return options.map((option) => option.value);
};

const getCommonFilters = (rawFilters: PerformanceIndicatorsReportFilters) => {
  const entityUuids = getFilterValue(rawFilters.entities);
  const gradeLevels = getFilterValue(rawFilters.gradeLevels);
  const userUuids = getFilterValue(rawFilters.users);

  return {
    ...(entityUuids && { entityUuids }),
    ...(gradeLevels && { gradeLevels }),
    ...(userUuids && { userUuids }),
  };
};

export const useTagsReportFilters = () => {
  const { filters, appliedFilters, ...rest } =
    useReportFilters<PerformanceIndicatorsReportFilters>();

  const variablesForFilters = {
    tagIds: getFilterValue(filters?.tags || [], []),
    filters: getCommonFilters(filters),
    entityFilter: { nameCont: filters.entityFilter },
    userFilter: { fullNameCont: filters.userFilter },
    schoolClassFilter: { nameCont: filters.schoolClassFilter },
  };

  const variables = {
    filter: {
      tagIds: getFilterValue(appliedFilters?.tags || []),
      schoolYear: appliedFilters.schoolYear?.value,
      schoolClassUuids: getFilterValue(appliedFilters.schoolClasses),
      ...getCommonFilters(appliedFilters),
    },
  };

  const tagSummaryVariables = {
    schoolYear: appliedFilters.schoolYear?.value,
    schoolClassUuids: getFilterValue(appliedFilters.schoolClasses),
    ...getCommonFilters(appliedFilters),
  };

  return { appliedFilters, filters, variablesForFilters, variables, tagSummaryVariables, ...rest };
};
