import { useTranslation } from 'react-i18next';
import { RefObject, useRef } from 'react';
import BaseSelect, { GroupBase, Props as ReactSelectProps, SelectInstance } from 'react-select';
import AsyncSelect, { AsyncProps } from 'react-select/async';
import cx from 'classnames';
import { ClassNamesConfig, StylesProps } from 'react-select/dist/declarations/src/styles';

import {
  MultiValueContainer,
  MultiValueLabel,
  MultiValueRemove,
} from '@shared/components/MultiSelect';
import { ErrorMessage } from '@shared/components/ErrorMessage/ErrorMessage';
import { InputLabel } from '@shared/components/InputLabel/InputLabel';

import { Option } from './Option';
import { DropdownIndicator } from './DropdownIndicator';
import { GroupHeading } from './GroupHeading';

interface AsyncSelectProps<
  Option extends unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends AsyncProps<Option, IsMulti, Group> {
  isAsync: true;
}

interface SyncSelectProps<
  Option extends unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends ReactSelectProps<Option, IsMulti, Group> {
  isAsync?: false;
}

export type SelectProps<
  Option extends SelectOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = (SyncSelectProps<Option, IsMulti, Group> | AsyncSelectProps<Option, IsMulti, Group>) & {
  selectRef?: RefObject<SelectInstance<Option, IsMulti, Group>>;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  isRequired?: boolean;
  errorMessage?: string;
  'data-testid'?: string;
  wrapperClassName?: string;
  limitedWidth?: boolean;
};

export type SelectOption = {
  label: string;
  value: string | number;
};

export const Select = <
  Option extends SelectOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: SelectProps<Option, IsMulti, Group>
) => {
  const { t } = useTranslation();
  const {
    selectRef,
    size = 'md',
    components,
    isAsync,
    isRequired,
    label,
    errorMessage,
    wrapperClassName,
    'data-testid': dataTestId,
    limitedWidth = false,
    ...selectProps
  } = props;

  const ref = useRef(null);

  const SelectComponent = isAsync ? AsyncSelect : BaseSelect;

  const isSmall = size === 'sm';
  const isMedium = size === 'md';
  const isLarge = size === 'lg';

  const innerSizeClasses = {
    '!leading-[22px] h-[22px]': !isLarge,
    '!leading-[30px] h-[30px]': isLarge,
  };

  const customClassNames: ClassNamesConfig<Option, IsMulti, Group> = {
    control: ({ isFocused, isDisabled }: StylesProps<Option, IsMulti, Group>['control']) =>
      cx('!rounded-sm text-font-secondary !cursor-pointer outline-none !shadow-none !min-h-0', {
        '!border-neutral-300 hover:!border-neutral-400': !isFocused,
        '!border-primary-500 !shadow-none': isFocused,
        'opacity-50 !bg-neutral-200 !border-neutral-400': isDisabled,
        '!bg-white': !isDisabled,
        '!border-danger-600': errorMessage,
      }),
    indicatorsContainer: () => cx('!p-0', { '!pr-xs': !isLarge, '!pr-sm': isLarge }),
    placeholder: () => cx('!text-font-secondary', innerSizeClasses),
    input: () => cx('!p-0 !m-0', innerSizeClasses),
    singleValue: () => cx('!m-0', innerSizeClasses),
    dropdownIndicator: () => '!p-0',
    menu: () =>
      cx('bg-white !shadow-200 border !rounded-sm !border-neutral-300 !z-high  min-w-full', {
        '!w-max !max-w-[40vw]': !limitedWidth,
      }),
    option: ({ isFocused, isSelected }: StylesProps<Option, IsMulti, Group>['option']) =>
      cx('!flex gap-xs justify-between !cursor-pointer items-center !px-sm !py-xs leading-lg', {
        '!bg-primary-200': isFocused,
        '!text-primary-500': isSelected,
        '!bg-transparent': isSelected && !isFocused,
        '!text-xxs !p-xs': isSmall,
        '!text-xs !p-xs': isMedium,
        '!text-sm !px-sm !py-x': isLarge,
      }),
    multiValue: () => '!bg-neutral-200 !rounded-xs p-xxs py-xxxs !m-0',
    multiValueLabel: () =>
      cx('!p-0 !text-font-primary min-w-0', {
        '!text-xxs !leading-base': isSmall,
        '!text-xs !leading-base': isMedium,
        '!text-sm !leading-lg': isLarge,
      }),
    multiValueRemove: () =>
      '!p-0 hover:!bg-danger-600 !rounded-xs overflow-hidden basis-sm shrink-0',
    valueContainer: () =>
      cx('flex gap-xxs items-center !flex-nowrap', {
        '!text-xxs !p-xs !pr-0 !py-xxs h-[30px]': isSmall,
        '!text-xs !p-xs !pr-0 h-[38px]': isMedium,
        '!text-sm !px-sm !py-x !pr-0 h-[54px]': isLarge,
      }),
    group: () => '!pt-0 !pb-xs last:!pb-0',
    menuList: () => 'p-xxs scrollbar',
  };

  const selectWrapperClassNames = cx('flex flex-col leading-lg min-w-[120px]', wrapperClassName, {
    'gap-xxxs': isSmall,
    'gap-xs': !isSmall,
  });

  const computedRef = selectRef || ref;
  const inputId = props.name ? `select-input-${props.name}` : undefined;

  return (
    <label className={selectWrapperClassNames} data-testid={dataTestId}>
      {label && (
        <InputLabel isDisabled={props.isDisabled} isRequired={isRequired} isSmall={isSmall}>
          {label}
        </InputLabel>
      )}
      <SelectComponent<Option, IsMulti, Group>
        aria-required={isRequired}
        classNames={customClassNames}
        components={{
          Option: (props) => <Option {...props} size={size} />,
          DropdownIndicator: (props) => <DropdownIndicator {...props} size={size} />,
          IndicatorSeparator: () => null,
          MultiValueLabel,
          MultiValueContainer,
          MultiValueRemove: (props) => <MultiValueRemove {...props} selectRef={computedRef} />,
          GroupHeading,
          ...components,
        }}
        noOptionsMessage={() => t('components.select.noOptions')}
        {...selectProps}
        ref={computedRef}
        classNamePrefix='select'
        closeMenuOnSelect={!props.isMulti}
        hideSelectedOptions={false}
        inputId={inputId}
        isClearable={!!props.isClearable && !props.isMulti}
        menuPlacement='auto'
      />
      <ErrorMessage errorMessage={errorMessage} />
    </label>
  );
};
