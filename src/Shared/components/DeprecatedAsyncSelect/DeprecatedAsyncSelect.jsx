/*eslint-disable react/prop-types */
import cx from 'classnames';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { orderBy } from 'lodash-es';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import './DeprecatedAsyncSelect.sass';

import { getByStringKey } from '@dc/utils';
import { IS_TEST_ENV } from '@dc/resources/constants';

import { ReactComponent as DoneIcon } from '@shared/svg/done.svg';
import debounce from '@shared/utils/debounce';
import SharedIcon from '@shared/components/Icon/Icon';

export const DeprecatedAsyncSelect = ({
  dataKey,
  disabled,
  className,
  filterIds,
  filterName,
  isMulti,
  label,
  name,
  onChange,
  OptionComponent,
  placeholder,
  query,
  queryOptions = {},
  SelectedValueComponent,
  sortOptions,
  value,
  valueKey,
}) => {
  const [filter, setFilter] = useState({ [filterName]: '' });
  const [callQuery, { loading, data }] = useLazyQuery(query, {
    variables: { perPage: 1000, filter },
    ...queryOptions,
  });
  const { t } = useTranslation();
  const [debounceTime, setDebounceTime] = useState(700);
  const selectClasses = cx('dc-async-select', className, {
    '-disabled': disabled,
  });

  const options = useMemo(() => (data ? getByStringKey(data, dataKey) : []), [data]);

  const filteredOptions = useMemo(
    () => (filterIds ? options.filter((option) => !filterIds.includes(option.id)) : options),
    [options]
  );

  const sortedOptions = useMemo(() => {
    if (!sortOptions) {
      return filteredOptions;
    }

    return sortOptions.field === 'id' || sortOptions.field === 'createdAt'
      ? orderBy(filteredOptions, (e) => parseInt(e.id), sortOptions.direction)
      : orderBy(filteredOptions, sortOptions.field, sortOptions.direction);
  }, [filteredOptions]);

  const debouncedSetFilter = useCallback(debounce(setFilter, IS_TEST_ENV ? 0 : debounceTime), [
    debounceTime,
  ]);

  const updateFilter = (value) => {
    debouncedSetFilter({ [filterName]: value });
  };

  // We always return all options since options are returned based on filter variable from BE
  const customFilter = () => options;

  useEffect(() => () => setDebounceTime(0), []);

  const InternalOptionComponent = ({
    data,
    innerProps,
    isDisabled,
    isFocused,
    isSelected,
    innerRef,
    cx,
  }) => {
    const optionClasses = cx({
      option: true,
      'option--is-disabled': isDisabled,
      'option--is-focused': isFocused,
      'option--is-selected': isSelected,
    });

    return !isDisabled ? (
      <div ref={innerRef} className={optionClasses} {...innerProps}>
        <OptionComponent data={data} />
        {isSelected && (
          <SharedIcon className='dc-async-select__option__icon' icon={<DoneIcon />} size='sm' />
        )}
      </div>
    ) : null;
  };

  const onMenuOpen = () => callQuery();

  // eslint-disable-next-line react/prop-types
  const SingleValue = ({ data, innerProps, innerRef }) =>
    data ? (
      <div ref={innerRef} {...innerProps} className='dc-async-select__custom-single-value'>
        <SelectedValueComponent data={data} />
      </div>
    ) : null;

  // eslint-disable-next-line react/prop-types
  const MultiValue = ({ data, innerProps, innerRef }) =>
    data ? (
      <div ref={innerRef} {...innerProps} className='dc-async-select__custom-multi-value'>
        <SelectedValueComponent data={data} />
      </div>
    ) : null;

  const IndicatorsContainer = () => null;

  return (
    <>
      <label
        className='messages-left-panel__modal__text-area-label'
        htmlFor='receiver-select__input'>
        {/*eslint-disable-next-line */}
        {label}
      </label>
      <Select
        className={selectClasses}
        classNamePrefix='dc-async-select'
        components={{
          Option: InternalOptionComponent,
          SingleValue,
          IndicatorsContainer,
          MultiValue,
        }}
        filterOption={customFilter}
        getOptionValue={(option) => option[valueKey]}
        isDisabled={disabled}
        isLoading={loading}
        isMulti={isMulti}
        menuPortalTarget={document.body}
        menuPosition='fixed'
        name={name}
        options={sortedOptions}
        placeholder={placeholder || t('common.placeholders.search')}
        value={value}
        onChange={onChange}
        onInputChange={updateFilter}
        onMenuOpen={onMenuOpen}
      />
    </>
  );
};

DeprecatedAsyncSelect.propTypes = {
  className: PropTypes.string,
  dataKey: PropTypes.string,
  disabled: PropTypes.bool,
  filterIds: PropTypes.array,
  filterName: PropTypes.string,
  isMulti: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  OptionComponent: PropTypes.func,
  placeholder: PropTypes.string,
  query: PropTypes.object,
  queryOptions: PropTypes.object,
  SelectedValueComponent: PropTypes.func,
  sortOptions: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  valueKey: PropTypes.string,
};
