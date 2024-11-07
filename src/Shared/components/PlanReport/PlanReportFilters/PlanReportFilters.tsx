import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { match } from 'ts-pattern';
import { MultiValue, SingleValue } from 'react-select';
import { isEmpty, noop } from 'lodash-es';
import { useUpdateEffect } from 'react-use';
import { useEffect, useRef } from 'react';

import { QueryAsyncSelect } from '@shared/components/AsyncSelect';
import { PLAN_OPTIONS } from '@shared/graphql/user/query/planOptions';
import { PLAN_REPORT_FILTERS } from '@shared/graphql/user/query/planReportFilters';
import { ReportFiltersSelect } from '@shared/components/ReportFiltersSelect/ReportFiltersSelect';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { Select } from '@shared/components/Select/Select';
import { ALL_OPTION } from '@shared/components/MultiSelect';
import { getInitialSchoolYear, schoolYearsOptions } from '@shared/utils/schoolYear';
import { mapFilterOptions } from '@shared/utils/mapFilterOptions';
import { FiltersStep } from '@shared/components/FiltersStep';
import { Tooltip } from '@shared/components/Tooltip';
import { ClassesMultiSelectWithAllOption } from '@shared/components/ReportClassesOption/ClassesMultiSelectWithAllOption';
import { getTeachersMap } from '@shared/utils/getTeachersMap';

import { Option, usePlanReportFilters } from '../usePlanReportFilters';

export const FINAL_STEP = 4;

const getIsSelectFocused = (name: string) => document.activeElement?.id === `select-input-${name}`;

type Props = {
  schoolYearStartDate: { day: number; month: number };
  onStepChange?: (activeStep: number) => void;
};

export const PlanReportFilters = ({ schoolYearStartDate, onStepChange = noop }: Props) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { filters, variablesForFilters, handleFilterChange } = usePlanReportFilters();
  const selectedPlanId = filters.plan;
  const { data, loading } = useQuery(PLAN_REPORT_FILTERS, {
    variables: variablesForFilters,
    skip: !selectedPlanId,
    fetchPolicy: 'no-cache',
  });
  const filtersToRefresh = useRef<('entities' | 'gradeLevels' | 'users' | 'schoolClasses')[]>([]);

  const activeStep = match(filters)
    .with({ plan: null }, () => 1)
    .with({ entities: [] }, { gradeLevels: [] }, { users: [] }, { schoolClasses: [] }, () => 2)
    .with({ schoolYear: null }, () => 3)
    .otherwise(() => FINAL_STEP);

  useEffect(() => {
    onStepChange(activeStep);
  }, [activeStep]);

  useUpdateEffect(() => {
    if (!data) {
      return;
    }

    filtersToRefresh.current.forEach((filterName) => {
      const filterData = data?.planReportFilters[filterName];

      const hasOptions =
        'nodesCount' in filterData ? filterData.nodesCount > 0 : !isEmpty(filterData);
      const shouldSetAllOption = hasOptions || filterName === 'schoolClasses';

      handleFilterChange(filterName, shouldSetAllOption ? [ALL_OPTION] : []);
    });

    filtersToRefresh.current = [];
  }, [data]);

  const initialSchoolYear = getInitialSchoolYear(schoolYearStartDate);

  const handleChangePlan = (newValue: SingleValue<Option>) => {
    handleFilterChange('plan', newValue);
    handleFilterChange('schoolYear', initialSchoolYear);
    filtersToRefresh.current = ['entities', 'gradeLevels', 'users', 'schoolClasses'];
  };

  const handleChangeEntities = (newValue: MultiValue<Option>) => {
    handleFilterChange('entities', [...newValue]);
    filtersToRefresh.current = ['gradeLevels', 'users', 'schoolClasses'];
  };

  const handleChangeGradeLevels = (newValue: MultiValue<Option>) => {
    handleFilterChange('gradeLevels', [...newValue]);
    filtersToRefresh.current = ['users', 'schoolClasses'];
  };

  const handleChangeUsers = (newValue: MultiValue<Option>) => {
    handleFilterChange('users', [...newValue]);
    filtersToRefresh.current = ['schoolClasses'];
  };

  const hasSelectedTeachers = !isEmpty(variablesForFilters.filters.userUuids);
  const isClassesSelectDisabled =
    !selectedPlanId || !hasSelectedTeachers || (loading && !getIsSelectFocused('schoolClasses'));

  const selectSize = isFullHD ? 'lg' : 'md';

  const teachersMap = getTeachersMap(data?.planReportFilters?.schoolClasses.nodes);

  return (
    <div className='flex gap-sm xxxl:gap-base flex-1'>
      <div className='pt-[29px]'>
        <FiltersStep
          activeStep={activeStep}
          isCompleted={!!selectedPlanId}
          separatorLineHeight={isFullHD ? 29 : 21}
          step={1}
        />
        <FiltersStep
          activeStep={activeStep}
          isCompleted={activeStep > 2}
          separatorLineHeight={isFullHD ? 330 : 252}
          step={2}
        />
        <FiltersStep activeStep={activeStep} isCompleted={!!filters.schoolYear} step={3} />
      </div>
      <div className='flex-1 flex flex-col gap-xs xxxl:gap-sm'>
        <QueryAsyncSelect
          dataKey='plans.nodes'
          label={t('planReport.plan')}
          menuPortalTarget={document.body}
          name='plan'
          placeholder={t('planReport.selectPlan')}
          query={PLAN_OPTIONS}
          size={selectSize}
          value={filters.plan}
          onChange={handleChangePlan}
        />
        <div className='pl-base flex flex-col gap-xs xxxl:gap-sm'>
          <ReportFiltersSelect
            isDisabled={!selectedPlanId || (loading && !getIsSelectFocused('entities'))}
            isLoading={loading}
            label={t('reports.schools')}
            name='entities'
            options={mapFilterOptions(data?.planReportFilters.entities.nodes, 'uuid')}
            placeholder={t('reports.selectSchools')}
            size={selectSize}
            value={filters.entities}
            onBlur={handleChangeEntities}
            onInputChange={(inputValue) => handleFilterChange('entityFilter', inputValue)}
          />
          <ReportFiltersSelect
            isDisabled={!selectedPlanId || loading}
            isLoading={loading}
            isSearchable={false}
            label={t('reports.gradeLevels')}
            name='gradeLevels'
            options={mapFilterOptions(data?.planReportFilters.gradeLevels)}
            placeholder={t('reports.selectGradeLevels')}
            size={selectSize}
            value={filters.gradeLevels}
            onBlur={handleChangeGradeLevels}
          />
          <ReportFiltersSelect
            isDisabled={!selectedPlanId || (loading && !getIsSelectFocused('users'))}
            isLoading={loading}
            label={t('reports.teachers')}
            name='users'
            options={mapFilterOptions(data?.planReportFilters.users.nodes, 'uuid', 'fullName')}
            placeholder={t('reports.selectTeachers')}
            size={selectSize}
            value={filters.users}
            onBlur={handleChangeUsers}
            onInputChange={(inputValue) => handleFilterChange('userFilter', inputValue)}
          />
          <Tooltip
            delayDuration={500}
            disabled={hasSelectedTeachers}
            message={t('reports.specifyTeacher')}
            sideOffset={-24}>
            <ReportFiltersSelect
              components={{
                Option: (props) => (
                  <ClassesMultiSelectWithAllOption
                    {...props}
                    size={selectSize}
                    teachersMap={teachersMap}
                  />
                ),
              }}
              isDisabled={isClassesSelectDisabled}
              isLoading={loading}
              label={t('reports.classes')}
              name='schoolClasses'
              options={mapFilterOptions(data?.planReportFilters.schoolClasses.nodes, 'uuid')}
              placeholder={t('reports.selectClasses')}
              size={selectSize}
              value={filters.schoolClasses}
              onBlur={(newValue) => handleFilterChange('schoolClasses', [...newValue])}
              onInputChange={(inputValue) => handleFilterChange('schoolClassFilter', inputValue)}
            />
          </Tooltip>
        </div>
        <Select
          isSearchable={false}
          label={t('reports.schoolYear')}
          menuPortalTarget={document.body}
          name='schoolYear'
          options={schoolYearsOptions}
          placeholder={t('reports.selectSchoolYear')}
          size={selectSize}
          value={filters.schoolYear}
          onChange={(newValue) => handleFilterChange('schoolYear', newValue)}
        />
      </div>
    </div>
  );
};
