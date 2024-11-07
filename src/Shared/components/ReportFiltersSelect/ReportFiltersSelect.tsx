import { ActionMeta, GroupBase, InputActionMeta, MultiValue } from 'react-select';
import { useEffect, useMemo, useState } from 'react';
import { debounce, isEmpty, isEqual, noop } from 'lodash-es';

import { ALL_OPTION, MultiSelectWithAllOption } from '@shared/components/MultiSelect';
import { Select, SelectProps } from '@shared/components/Select';

type SelectOption = { label: string; value: string | number };

type Props<Option extends SelectOption, Group extends GroupBase<Option> = GroupBase<Option>> = Omit<
  SelectProps<Option, true, Group>,
  'onBlur'
> & {
  onBlur: (newValue: MultiValue<Option>) => void;
};

const DEBOUNCE_TIME = 500;

export const ReportFiltersSelect = <
  Option extends SelectOption,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  onBlur,
  onInputChange = noop,
  options = [],
  value = [],
  size = 'md',
  ...props
}: Props<Option, Group>) => {
  const safeValue = value as MultiValue<Option>;
  const [internalValue, setInternalValue] = useState(safeValue);

  useEffect(() => {
    if (!isEqual(safeValue, internalValue)) {
      setInternalValue(safeValue);
    }
  }, [value]);

  const selectOptions = useMemo(
    () => (isEmpty(options) ? [] : [ALL_OPTION as Option, ...options]),
    [options]
  );

  const handleInputChange = (inputValue: string, actionMeta: InputActionMeta) => {
    onInputChange(inputValue, actionMeta);
  };

  const debouncedHandleInputChange = useMemo(() => debounce(handleInputChange, DEBOUNCE_TIME), []);

  const handleChange = (newValue: MultiValue<Option>, actionMeta: ActionMeta<Option>) => {
    if (actionMeta.action === 'clear') {
      onBlur(newValue);
    }

    setInternalValue(newValue);
  };

  return (
    <Select
      backspaceRemovesValue={false}
      components={{ Option: (props) => <MultiSelectWithAllOption {...props} size={size} /> }}
      data-testid={`report-filters-select-${props.name}`}
      isMulti={true}
      menuPortalTarget={document.body}
      options={selectOptions}
      size={size}
      value={internalValue}
      onBlur={() => onBlur(internalValue)}
      onChange={handleChange}
      onInputChange={debouncedHandleInputChange}
      {...props}
    />
  );
};
