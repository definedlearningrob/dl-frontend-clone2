import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import {
  GroupBase,
  OnChangeValue,
  ActionMeta,
  Props as ReactSelectProps,
  SelectInstance,
} from 'react-select';
import { isArray } from 'lodash-es';
import cx from 'classnames';
import Creatable from 'react-select/creatable';

import { DropdownIndicator } from '@shared/components/Select/DropdownIndicator';
import { SelectOption } from '@shared/components/Select';

export type SelectProps<
  Option extends unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = Omit<ReactSelectProps<Option, IsMulti, Group>, 'classNamePrefix'> & {
  selectRef?: React.ForwardedRef<SelectInstance<Option, IsMulti, Group>>;
  size?: 'sm' | 'md' | 'lg';
};

const emptyOptions = [] as const;

export const CreatableSelect = <
  Option extends SelectOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: SelectProps<Option, IsMulti, Group>
) => {
  const { t } = useTranslation();
  const {
    className,
    selectRef,
    size = 'md',
    components,
    onChange,
    options: defaultOptions = emptyOptions,
    ...selectProps
  } = props;

  const [options, setOptions] = useState(defaultOptions);

  const handleOnCreate = (value: string) => {
    const currentValue = isArray(selectProps.value) ? selectProps.value : [selectProps.value];

    const newOption = { value: value, label: value } as Option;

    const selected = [newOption, ...currentValue] as unknown as OnChangeValue<Option, IsMulti>;

    onChange && onChange(selected, undefined as unknown as ActionMeta<Option>);

    setOptions((prevValue) => [...prevValue, newOption]);
  };

  return (
    <Creatable<Option, IsMulti, Group>
      ref={selectRef}
      components={{
        DropdownIndicator: (props) => <DropdownIndicator {...props} size={size} />,
        IndicatorSeparator: () => null,
        ...components,
      }}
      noOptionsMessage={() => t('components.select.noOptions')}
      {...selectProps}
      className={cx(`-${size}`, className)}
      classNamePrefix='creatable-select'
      options={options}
      onChange={onChange}
      onCreateOption={handleOnCreate}
    />
  );
};
