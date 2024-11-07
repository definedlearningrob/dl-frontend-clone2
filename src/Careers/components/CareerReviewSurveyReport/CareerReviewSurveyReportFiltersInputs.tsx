import { useTranslation } from 'react-i18next';
import { match } from 'ts-pattern';
import { forEach, isEmpty, isNil, noop, pull, times } from 'lodash-es';
import { useEffect, useRef } from 'react';
import { useUpdateEffect } from 'react-use';
import { MultiValue } from 'react-select';
import { useCareerReviewSurveyReportFiltersQuery } from '@graphql/dc/users/hooks';

import { Option } from '@dc/components/CareerReviewSurveyReport/useCareerReviewSurveyReportFilters';
import { useCareerReviewSurveyReportFilters } from '@dc/components/CareerReviewSurveyReport/useCareerReviewSurveyReportFilters';

import { FiltersStep } from '@shared/components/FiltersStep';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { ReportFiltersSelect } from '@shared/components/ReportFiltersSelect/ReportFiltersSelect';
import { mapFilterOptions } from '@shared/utils/mapFilterOptions';
import { Tooltip } from '@shared/components/Tooltip';
import { ALL_OPTION } from '@shared/components/MultiSelect';
import { omitTypename } from '@shared/utils/omitTypename';
import { ReportFiltersDateRangePicker } from '@shared/components/ReportFiltersDateRangePicker/ReportFiltersDateRangePicker';
import { ClassesMultiSelectWithAllOption } from '@shared/components/ReportClassesOption/ClassesMultiSelectWithAllOption';
import { getTeachersMap } from '@shared/utils/getTeachersMap';

export const FINAL_STEP = 6;
const getIsSelectFocused = (name: string) => document.activeElement?.id === `select-input-${name}`;

type FilterName = 'entities' | 'gradeLevels' | 'users' | 'schoolClasses';

type Props = {
  onStepChange?: (activeStep: number) => void;
};

export const CareerReviewSurveyReportFiltersInputs = ({ onStepChange = noop }: Props) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { filters, variablesForFilters, handleFilterChange } = useCareerReviewSurveyReportFilters();

  const { data, loading } = useCareerReviewSurveyReportFiltersQuery({
    variables: variablesForFilters,
    fetchPolicy: 'no-cache',
  });
  const filtersToRefresh = useRef<FilterName[]>([]);

  const activeStep = match(filters)
    .with({ entities: [] }, () => 1)
    .with({ gradeLevels: [] }, () => 2)
    .with({ users: [] }, () => 3)
    .with({ schoolClasses: [] }, () => 4)
    .with({ endDate: null }, () => 5)
    .otherwise(() => FINAL_STEP);

  useEffect(() => {
    onStepChange(activeStep);
  }, [activeStep]);

  useUpdateEffect(() => {
    if (!data) {
      return;
    }

    const careerReviewSurveyFilters = omitTypename(data.careerReviewSurveyReportFilters);

    forEach(careerReviewSurveyFilters, (filterData, filterName) => {
      const hasOptions = Array.isArray(filterData)
        ? !isEmpty(filterData)
        : filterData.nodesCount > 0;

      if (!hasOptions && filterName !== 'schoolClasses') {
        handleFilterChange(filterName as FilterName, []);
        pull(filtersToRefresh.current, filterName);
      }
    });

    filtersToRefresh.current.forEach((filterName) => {
      handleFilterChange(filterName, [ALL_OPTION]);
    });
    filtersToRefresh.current = [];
  }, [data]);

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

  const handleDateChange = (dates: [Date, Date]) => {
    const [startDate, endDate] = dates;

    handleFilterChange('startDate', startDate);
    handleFilterChange('endDate', endDate);
  };

  const hasSelectedTeachers = !isEmpty(variablesForFilters.filters.userUuids);
  const selectSize = isFullHD ? 'lg' : 'md';

  const isCompleted = !isNil(filters.startDate) && !isNil(filters.endDate);

  const teachersMap = getTeachersMap(data?.careerReviewSurveyReportFilters?.schoolClasses.nodes);

  return (
    <div className='flex gap-sm xxxl:gap-base flex-1'>
      <div className='pt-[29px]'>
        {times(4, (index) => (
          <FiltersStep
            key={index}
            activeStep={activeStep}
            isCompleted={activeStep > index + 1}
            separatorLineHeight={isFullHD ? 29 : 21}
            step={index + 1}
          />
        ))}
        <FiltersStep activeStep={activeStep} isCompleted={isCompleted} step={5} />
      </div>
      <div className='flex-1 flex flex-col gap-xs xxxl:gap-sm'>
        <ReportFiltersSelect
          isDisabled={loading && !getIsSelectFocused('entities')}
          isLoading={loading}
          isRequired={true}
          label={t('reports.schools')}
          name='entities'
          options={mapFilterOptions(data?.careerReviewSurveyReportFilters.entities.nodes, 'uuid')}
          placeholder={t('reports.selectSchools')}
          size={selectSize}
          value={filters.entities}
          onBlur={handleChangeEntities}
          onInputChange={(inputValue) => handleFilterChange('entityFilter', inputValue)}
        />
        <ReportFiltersSelect
          isDisabled={loading}
          isLoading={loading}
          isRequired={true}
          isSearchable={false}
          label={t('reports.gradeLevels')}
          name='gradeLevels'
          options={mapFilterOptions(data?.careerReviewSurveyReportFilters.gradeLevels)}
          placeholder={t('reports.selectGradeLevels')}
          size={selectSize}
          value={filters.gradeLevels}
          onBlur={handleChangeGradeLevels}
        />
        <ReportFiltersSelect
          isDisabled={loading && !getIsSelectFocused('users')}
          isLoading={loading}
          isRequired={true}
          label={t('reports.teachers')}
          name='users'
          options={mapFilterOptions(
            data?.careerReviewSurveyReportFilters.users.nodes,
            'uuid',
            'fullName'
          )}
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
            isDisabled={!hasSelectedTeachers || (loading && !getIsSelectFocused('schoolClasses'))}
            isLoading={loading}
            isRequired={true}
            label={t('reports.classes')}
            name='schoolClasses'
            options={mapFilterOptions(
              data?.careerReviewSurveyReportFilters.schoolClasses.nodes,
              'uuid'
            )}
            placeholder={t('reports.selectClasses')}
            size={selectSize}
            value={filters.schoolClasses}
            onBlur={(newValue) => handleFilterChange('schoolClasses', [...newValue])}
            onInputChange={(inputValue) => handleFilterChange('schoolClassFilter', inputValue)}
          />
        </Tooltip>
        <ReportFiltersDateRangePicker
          endDate={filters.endDate}
          label={t('reports.selectPeriod')}
          startDate={filters.startDate}
          onChange={handleDateChange}
        />
      </div>
    </div>
  );
};
