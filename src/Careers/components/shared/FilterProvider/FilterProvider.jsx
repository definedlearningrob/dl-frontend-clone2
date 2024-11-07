import cx from 'classnames';
import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty, omitBy } from 'lodash-es';

import debounce from '@shared/utils/debounce';
import useQueryParams from '@shared/hooks/useQueryParams';
import { ReactComponent as Search } from '@shared/svg/search.svg';
import { TextInput } from '@shared/components/TextInput/TextInput';
import { Select } from '@shared/components/Select';

import '@dc/components/shared/FilterProvider/FilterProvider.sass';

SharedFilterProvider.propTypes = {
  children: PropTypes.func,
  omitUrl: PropTypes.bool,
  onFilterChange: PropTypes.func,
};

const DEBOUNCE_TIME = 700;

const mapStringValue = (value, isMulti) => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (isMulti) return value.split(',');

  return value;
};

function SharedFilterProvider({ children, omitUrl, onFilterChange, defaultFilter = {} }) {
  const { params, removeQueryParams, updateQueryParams } = useQueryParams();
  const paramNames = Object.keys(params);
  const initialFilter = omitUrl
    ? {}
    : paramNames.reduce((acc, paramName) => {
        const isParamPartOfFilter = /In|Cont|Eq/.test(paramName);
        const isMulti = paramName.includes('In');

        return isParamPartOfFilter
          ? { ...acc, [paramName]: mapStringValue(params[paramName], isMulti) }
          : acc;
      }, {});
  const filterParamNames = Object.keys(initialFilter);
  const initialFields = omitUrl
    ? {}
    : filterParamNames.reduce(
        (acc, filterKey) => ({
          ...acc,
          [filterKey.replace(/Cont|Eq|In/, '')]: initialFilter[filterKey],
        }),
        {}
      );
  const [fields, setFields] = useState(initialFields);
  const [filter, setFilter] = useState({ ...defaultFilter, ...initialFilter });

  const updateFilter = (passedFilter) => {
    const nonEmptyFilters = omitBy(passedFilter, isEmpty);
    setFilter(nonEmptyFilters);

    if (!omitUrl) {
      const keysToRemove = Object.keys(passedFilter).filter((key) => isEmpty(passedFilter[key]));

      updateQueryParams(nonEmptyFilters);
      keysToRemove.length && removeQueryParams(keysToRemove);
    }

    onFilterChange && onFilterChange(nonEmptyFilters);
  };

  const debouncedSetFilter = useCallback(debounce(updateFilter, DEBOUNCE_TIME), [onFilterChange]);

  const handleChange =
    (field, { min } = {}) =>
    ({ target: { value } }) => {
      const trimmed = value.trim();

      setFields({ ...fields, [field]: value });

      if (min) {
        if (min > trimmed.length && trimmed.length > 0) return;
        debouncedSetFilter({ ...filter, [`${field}Cont`]: trimmed });
      } else {
        debouncedSetFilter({ ...filter, [`${field}Cont`]: trimmed });
      }
    };

  const handleSelectChange = (field, isMulti) => (newValue) => {
    const fieldName = isMulti ? `${field}In` : `${field}Eq`;
    const fieldValue = isMulti ? newValue.map(({ value }) => value) : newValue.value;

    updateFilter({ ...filter, [fieldName]: fieldValue });
    setFields({ ...fields, [field]: fieldValue });
  };

  return children({
    clearFilter: () => {
      removeQueryParams(Object.keys(filter));
      setFields({});
      setFilter({});
    },
    filter,
    fields,
    handleSelectChange,
    handleChange,
  });
}

SharedFilterProvider.Search = function ({
  className,
  field,
  fields,
  isWide,
  label,
  minLetters,
  placeholder,
  handleChange,
}) {
  const { t } = useTranslation();

  const classes = cx('filter__searchbar', className, { '-long': isWide });

  const value = useMemo(() => fields[field], [fields, field]);
  const showTypeMore = useMemo(
    () => minLetters && value?.length > 0 && value.length < minLetters,
    [value, minLetters]
  );
  const typeMoreClasses = cx('filter__type-more', {
    '-visible': showTypeMore,
  });

  return (
    <div className={classes}>
      <div className='filter__search'>
        <TextInput
          Icon={Search}
          data-testid={`filter-search-bar-${field}`}
          label={label}
          placeholder={placeholder}
          type='text'
          value={value || ''}
          onChange={handleChange(field, { min: minLetters })}
        />
      </div>
      {minLetters && (
        <span className={typeMoreClasses}>
          {t('shared.filterProvider.typeInfo', { number: minLetters })}
        </span>
      )}
    </div>
  );
};

SharedFilterProvider.Search.propTypes = {
  className: PropTypes.string,
  field: PropTypes.string,
  fields: PropTypes.object,
  handleChange: PropTypes.func,
  isWide: PropTypes.bool,
  label: PropTypes.string,
  minLetters: PropTypes.number,
  placeholder: PropTypes.string,
};

SharedFilterProvider.Select = function ({
  className,
  selectClassName,
  field,
  fields,
  handleSelectChange,
  initialValue,
  label,
  options,
  isMulti,
}) {
  const getOption = (value) => options.find((option) => option.value === value);

  const filterValue = fields[field];
  const parsedFilterValue =
    isMulti && filterValue ? filterValue.map((value) => getOption(value)) : getOption(filterValue);

  return (
    <Select
      className={className}
      isMulti={isMulti}
      label={label}
      options={options}
      selectClassName={selectClassName}
      showError={false}
      value={parsedFilterValue ?? initialValue}
      onChange={handleSelectChange(field, isMulti)}
    />
  );
};

SharedFilterProvider.Select.propTypes = {
  className: PropTypes.string,
  field: PropTypes.string,
  fields: PropTypes.object,
  handleSelectChange: PropTypes.func,
  initialValue: PropTypes.object,
  isMulti: PropTypes.bool,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    })
  ),
  placeholder: PropTypes.string,
  selectClassName: PropTypes.string,
};

export default SharedFilterProvider;
