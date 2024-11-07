import cx from 'classnames';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';

import debounce from '@shared/utils/debounce';
import useQueryParams from '@shared/hooks/useQueryParams';
import { ReactComponent as SearchIcon } from '@shared/svg/search.svg';
import { TextInput } from '@shared/components/TextInput/TextInput';

AdminLessonsFormItemsSharedFilterProvider.propTypes = {
  children: PropTypes.func,
  omitUrl: PropTypes.bool,
  onFilterChange: PropTypes.func,
};

const DEBOUNCE_TIME = 700;

function AdminLessonsFormItemsSharedFilterProvider({ children, omitUrl, onFilterChange }) {
  const { params, removeQueryParams, updateQueryParams } = useQueryParams();

  const initialFilter = omitUrl
    ? {}
    : Object.keys(params).reduce(
        (acc, paramKey) =>
          paramKey.includes('Cont') ? { ...acc, [paramKey]: params[paramKey] } : acc,
        {}
      );

  const initialFields = omitUrl
    ? {}
    : Object.keys(initialFilter).reduce(
        (acc, filterKey) => ({ ...acc, [filterKey.replace('Cont', '')]: initialFilter[filterKey] }),
        {}
      );

  const [fields, setFields] = useState(initialFields);
  const [filter, setFilter] = useState(initialFilter);
  const [focused, setFocused] = useState(false);
  const updateFilter = (filter) => {
    setFilter(filter);
    !omitUrl && updateQueryParams(filter);
    onFilterChange && onFilterChange(filter);
  };
  const debouncedSetFilter = useCallback(debounce(updateFilter, DEBOUNCE_TIME), []);
  const focusHandle = () => setFocused(true);
  const blurHandle = () => setFocused(false);
  const handleChange = (field) => (event) => {
    debouncedSetFilter({ ...filter, [`${field}Cont`]: event.target.value });
    setFields({ ...fields, [field]: event.target.value });
  };

  return children({
    clearFilter: () => {
      removeQueryParams(Object.keys(filter));
      setFields({});
      setFilter({});
    },
    filter,
    // eslint-disable-next-line react/prop-types
    SearchBar: ({ className, field, placeholder }) => {
      const inputEl = useRef(null);
      const classes = cx('filter__searchbar', {
        className: className,
      });

      useEffect(() => {
        inputEl && focused && inputEl.current.focus();
      }, [inputEl]);

      return (
        <div className={classes}>
          <TextInput
            Icon={SearchIcon}
            data-testid={`filter-search-bar-${field}`}
            forwardRef={inputEl}
            placeholder={placeholder}
            value={fields[field]}
            onBlur={blurHandle}
            onChange={handleChange(field)}
            onFocus={focusHandle}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();

                return false;
              }
            }}
          />
        </div>
      );
    },
  });
}

export default AdminLessonsFormItemsSharedFilterProvider;
