import { ChangeEvent, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { debounce, isEmpty } from 'lodash-es';
import { GroupBase, MultiValue, SelectInstance, SingleValue } from 'react-select';
import cx from 'classnames';

import { useCourseFilters } from '@dc/components/Courses/CourseFilters/useCourseFilters';
import { ClustersSelect } from '@dc/shared/ClustersSelect/ClustersSelect';
import { COURSE_TYPES } from '@dc/resources/constants';
import { useCollections } from '@dc/graphql/shared/hooks/useCollections';

import { TextInput } from '@shared/components/TextInput/TextInput';
import { ReactComponent as SearchIcon } from '@shared/svg/search.svg';
import { ReactComponent as ClearIcon } from '@shared/svg/clear.svg';
import { TreeSelectOption, TreeSelectElement } from '@shared/components/TreeSelect/TreeSelect';
import { Tooltip } from '@shared/components/Tooltip';
import { useRole } from '@shared/hooks/useRole';
import { Select } from '@shared/components/Select';
import { IconButton } from '@shared/components/IconButton/IconButton';

const DEBOUNCE_TIME = 500;

type FilterOption = { value: string; label: string };
type SelectElement<T extends unknown, IsMulti extends boolean> = SelectInstance<
  T,
  IsMulti,
  GroupBase<T>
>;

export const CourseFilters = () => {
  const { t } = useTranslation();
  const { handleFilterChange, resetFilters, filters } = useCourseFilters();
  const { isUser } = useRole();
  const { data: collectionsData, loading: collectionsLoading } = useCollections();

  const searchRef = useRef<HTMLInputElement>(null);
  const clustersSelectRef = useRef<TreeSelectElement>(null);
  const gradeLevelSelectRef = useRef<SelectElement<FilterOption, false>>(null);
  const collectionsSelectRef = useRef<SelectElement<FilterOption, true>>(null);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFilterChange('searchableColumnsCont', event.target.value);
  };

  const debouncedSearchChange = useMemo(() => debounce(handleSearchChange, DEBOUNCE_TIME), []);

  const handlePathwaysChange = (pathways: MultiValue<TreeSelectOption>) => {
    handleFilterChange(
      'pathwayIdIn',
      pathways.map((pathway) => pathway.value!.toString())
    );
  };

  const handleGradeLevelChange = (gradeLevel: SingleValue<FilterOption>) => {
    handleFilterChange('typeEq', gradeLevel?.value);
  };

  const handleCollectionChange = (collections: MultiValue<FilterOption>) => {
    handleFilterChange(
      'collectionIdIn',
      collections.map((collection) => collection.value)
    );
  };

  const handleClearFilters = () => {
    resetFilters();

    if (searchRef.current) {
      searchRef.current.value = '';
    }
    clustersSelectRef.current?.clearValue();
    gradeLevelSelectRef.current?.clearValue();
    collectionsSelectRef.current?.clearValue();
  };

  const gradeLevelOptions = useMemo(
    () => [
      { value: COURSE_TYPES.HIGH_SCHOOL, label: t('courses.types.highSchool') },
      { value: COURSE_TYPES.MIDDLE_SCHOOL, label: t('courses.types.middleSchool') },
    ],
    []
  );

  const collectionOptions = useMemo(
    () =>
      collectionsData?.collections.map((collection) => ({
        label: collection.name,
        value: collection.id,
      })) || [],
    [collectionsData]
  );

  const showClearButton = Object.values(filters).some((filter) => !isEmpty(filter));
  const filterWrapperClasses = 'flex-1 min-w-0';

  return (
    <div className='flex items-end gap-sm'>
      <TextInput
        Icon={SearchIcon}
        className={filterWrapperClasses}
        forwardRef={searchRef}
        label={t('opportunities.search')}
        minLength={3}
        placeholder={t('common.placeholders.searchFor', {
          field: t('common.fields.course.courses').toLowerCase(),
        })}
        onChange={debouncedSearchChange}
      />
      <div className={filterWrapperClasses}>
        <ClustersSelect
          className={filterWrapperClasses}
          selectRef={clustersSelectRef}
          onChange={handlePathwaysChange}
        />
      </div>
      {isUser && (
        <div className={filterWrapperClasses}>
          <Select
            isClearable={true}
            label={t('courses.filters.gradeLevel')}
            options={gradeLevelOptions}
            placeholder={t('common.actions.showAll')}
            onChange={handleGradeLevelChange}
          />
        </div>
      )}
      <div className={filterWrapperClasses}>
        <Select
          isLoading={collectionsLoading}
          isMulti={true}
          isSearchable={false}
          label={t('courses.filters.collection')}
          name='collectionsSelect'
          options={collectionOptions}
          placeholder={t('common.actions.showAll')}
          selectRef={collectionsSelectRef}
          onChange={handleCollectionChange}
        />
      </div>
      <Tooltip
        className={cx({
          invisible: !showClearButton,
        })}
        message={t('common.actions.clearAll')}>
        <IconButton
          Icon={ClearIcon}
          aria-label={t('common.actions.clearAll')}
          size='lg'
          variant='primary-outlined'
          onClick={handleClearFilters}
        />
      </Tooltip>
    </div>
  );
};
