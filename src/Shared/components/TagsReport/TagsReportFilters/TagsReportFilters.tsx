import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { match } from 'ts-pattern';
import { MultiValue } from 'react-select';
import { isEmpty, noop } from 'lodash-es';
import { useUpdateEffect } from 'react-use';
import { useEffect, useRef } from 'react';

import { ReportFiltersSelect } from '@shared/components/ReportFiltersSelect/ReportFiltersSelect';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { ALL_OPTION } from '@shared/components/MultiSelect';
import { getInitialSchoolYear, schoolYearsOptions } from '@shared/utils/schoolYear';
import { mapFilterOptions } from '@shared/utils/mapFilterOptions';
import { FiltersStep } from '@shared/components/FiltersStep';
import { TAGS_REPORT_FILTERS } from '@shared/graphql/user/query/tagsReportFilters';
import { Select } from '@shared/components/Select';
import { Tooltip } from '@shared/components/Tooltip';
import { ClassesMultiSelectWithAllOption } from '@shared/components/ReportClassesOption/ClassesMultiSelectWithAllOption';
import { getTeachersMap } from '@shared/utils/getTeachersMap';

import { Option, useTagsReportFilters } from '../useTagsReportFilters';

import { TagsSelect } from './TagsSelect';

export const FINAL_STEP = 4;

const getIsSelectFocused = (name: string) => document.activeElement?.id === `select-input-${name}`;

type Props = {
  schoolYearStartDate: { day: number; month: number };
  onStepChange?: (activeStep: number) => void;
};

export const TagsReportFilters = ({ schoolYearStartDate, onStepChange = noop }: Props) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { filters, variablesForFilters, handleFilterChange } = useTagsReportFilters();
  const hasSelectedTags = !isEmpty(filters.tags);

  const { data, loading } = useQuery(TAGS_REPORT_FILTERS, {
    variables: variablesForFilters,
    fetchPolicy: 'no-cache',
  });
  const filtersToRefresh = useRef<('entities' | 'gradeLevels' | 'users' | 'schoolClasses')[]>([]);

  const activeStep = match(filters)
    .with({ tags: [] }, () => 1)
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
      const filterData = data?.tagReportFilters[filterName];
      const hasOptions =
        'nodesCount' in filterData ? filterData.nodesCount > 0 : !isEmpty(filterData);
      const shouldSetAllOption = hasOptions || filterName === 'schoolClasses';

      handleFilterChange(filterName, shouldSetAllOption ? [ALL_OPTION] : []);
    });

    filtersToRefresh.current = [];
  }, [data, filtersToRefresh.current]);

  const initialSchoolYear = getInitialSchoolYear(schoolYearStartDate);

  const handleChangeTags = (newValue: MultiValue<Option>) => {
    handleFilterChange('tags', [...newValue]);
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
    !hasSelectedTags || !hasSelectedTeachers || (loading && !getIsSelectFocused('schoolClasses'));

  const selectSize = isFullHD ? 'lg' : 'md';

  const teachersMap = getTeachersMap(data?.tagReportFilters?.schoolClasses.nodes);

  return (
    <div className='flex gap-sm xxxl:gap-base flex-1'>
      <div className='pt-[29px]'>
        <FiltersStep
          activeStep={activeStep}
          isCompleted={hasSelectedTags}
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
        <TagsSelect size={selectSize} value={filters.tags} onBlur={handleChangeTags} />
        <div className='pl-base flex flex-col gap-xs xxxl:gap-sm'>
          <ReportFiltersSelect
            isDisabled={!hasSelectedTags || (loading && !getIsSelectFocused('entities'))}
            isLoading={loading}
            label={t('reports.schools')}
            name='entities'
            options={mapFilterOptions(data?.tagReportFilters.entities.nodes, 'uuid')}
            placeholder={t('reports.selectSchools')}
            size={selectSize}
            value={filters.entities}
            onBlur={handleChangeEntities}
            onInputChange={(inputValue) => handleFilterChange('entityFilter', inputValue)}
          />
          <ReportFiltersSelect
            isDisabled={!hasSelectedTags || loading}
            isLoading={loading}
            isSearchable={false}
            label={t('reports.gradeLevels')}
            name='gradeLevels'
            options={mapFilterOptions(data?.tagReportFilters.gradeLevels)}
            placeholder={t('reports.selectGradeLevels')}
            size={selectSize}
            value={filters.gradeLevels}
            onBlur={handleChangeGradeLevels}
          />
          <ReportFiltersSelect
            isDisabled={!hasSelectedTags || (loading && !getIsSelectFocused('users'))}
            isLoading={loading}
            label={t('reports.teachers')}
            maxMenuHeight={200}
            name='users'
            options={mapFilterOptions(data?.tagReportFilters.users.nodes, 'uuid', 'fullName')}
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
              options={mapFilterOptions(data?.tagReportFilters.schoolClasses.nodes, 'uuid')}
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
          maxMenuHeight={isFullHD ? 220 : 120}
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
