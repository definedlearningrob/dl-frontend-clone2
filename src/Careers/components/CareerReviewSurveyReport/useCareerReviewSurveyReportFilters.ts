import dayjs from 'dayjs';

import { useReportFilters } from '@shared/components/ReportFiltersProvider/ReportFiltersProvider';
import { ALL_OPTION } from '@shared/components/MultiSelect';

export type Option<T = string> = { label: string; value: T };

type CareerReviewSurveyReportFilters = {
  entities: Option[];
  gradeLevels: Option[];
  users: Option[];
  schoolClasses: Option[];
  entityFilter: string;
  userFilter: string;
  schoolClassFilter: string;
  startDate: Date | null;
  endDate: Date | null;
};

const DATE_FORMAT = 'YYYY-MM-DD';

const getFilterValue = (options: Option<string>[]) => {
  const isAllPlaceholderSelected = options.length === 1 && options[0].value === ALL_OPTION.value;

  if (isAllPlaceholderSelected) return [];

  return options.map((option) => option.value);
};

const getCommonFilters = (rawFilters: CareerReviewSurveyReportFilters) => {
  const entityUuids = getFilterValue(rawFilters.entities);
  const gradeLevels = getFilterValue(rawFilters.gradeLevels);
  const userUuids = getFilterValue(rawFilters.users);

  return {
    entityUuids,
    gradeLevels,
    userUuids,
  };
};

export const useCareerReviewSurveyReportFilters = () => {
  const { filters, appliedFilters, ...rest } = useReportFilters<CareerReviewSurveyReportFilters>();

  const variablesForFilters = {
    filters: getCommonFilters(filters),
    entityFilter: { nameCont: filters.entityFilter },
    userFilter: {
      fullNameCont: filters.userFilter,
    },
    schoolClassFilter: {
      nameCont: filters.schoolClassFilter,
    },
  };

  const { schoolClasses, startDate, endDate } = appliedFilters;

  const variables = {
    filter: {
      startDate: dayjs(startDate).format(DATE_FORMAT),
      endDate: dayjs(endDate).format(DATE_FORMAT),
      schoolClassUuids: getFilterValue(schoolClasses) ?? undefined,
      ...getCommonFilters(appliedFilters),
    },
  };

  return { filters, appliedFilters, variablesForFilters, variables, ...rest };
};
