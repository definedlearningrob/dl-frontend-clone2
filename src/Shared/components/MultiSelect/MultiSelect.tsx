import cx from 'classnames';
import { KeyboardEvent, ReactNode, RefObject, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  GroupBase,
  components,
  MultiValue,
  MultiValueGenericProps,
  MultiValueRemoveProps,
  SelectInstance,
  OptionProps,
  DropdownIndicatorProps,
  InputProps,
  CSSObjectWithLabel,
} from 'react-select';

import { ReactComponent as ChevronDownIcon } from '@shared/svg/chevron_down.svg';
import { ReactComponent as ChevronUpIcon } from '@shared/svg/chevron_up.svg';
import { ReactComponent as CloseIcon } from '@shared/svg/close.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

import SharedCheckbox from '../Checkbox/Checkbox';
import { Select, SelectOption, SelectProps } from '../Select';
import { CreatableSelect } from '../CreatableSelect/CreatableSelect';

import styles from './MultiSelect.module.sass';
import './DeprecatedSelect.sass';

export const MultiSelect = <
  Option extends { label: string; value: string | number },
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  className,
  components,
  selectRef,
  isCreatable,
  isAsync,
  ...selectProps
}: SelectProps<Option, true, Group> & {
  isCreatable?: boolean;
}) => {
  const ref = useRef(null);

  const SelectComponent = isCreatable ? CreatableSelect : Select;

  return (
    <SelectComponent
      backspaceRemovesValue={false}
      blurInputOnSelect={false}
      className={cx(styles.select, className)}
      closeMenuOnSelect={false}
      components={{
        Option: MultiValueOption,
        MultiValueContainer,
        MultiValueLabel,
        MultiValueRemove: (props) => <MultiValueRemove {...props} selectRef={selectRef || ref!} />,
        IndicatorSeparator: () => null,
        DropdownIndicator: (props) => <DropdownIndicator {...props} size={selectProps.size} />,
        Input: MultiValueInput,
        ...components,
      }}
      hideSelectedOptions={false}
      isAsync={isAsync}
      isClearable={false}
      isMulti={true}
      selectRef={selectRef || ref}
      styles={{
        menu: (base) => ({ ...base, width: 'max-content', minWidth: '100%' } as CSSObjectWithLabel),
      }}
      {...selectProps}
    />
  );
};

export const MultiValueOption = <
  Option extends SelectOption,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  children,
  ...props
}: OptionProps<Option, true, Group>) => (
  <components.Option {...props}>
    <div className='flex items-center'>
      <SharedCheckbox checked={props.isSelected} className='m-0' readOnly={true} />
      <div className='text-xs'>{children}</div>
    </div>
  </components.Option>
);
export const MultiValueContainer = <
  Option extends SelectOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  children,
  ...props
}: MultiValueGenericProps<Option, IsMulti, Group>) => {
  const value = props.data.value;
  const selectedOptions = props.selectProps.value as MultiValue<Option>;

  const index = selectedOptions?.findIndex((option) => option.value === value);

  if (index && index > 0) return null;

  return (
    <components.MultiValueContainer {...props}>
      <Chip data-testid='select-chip' disabled={props.selectProps.isDisabled}>
        {children}
      </Chip>
    </components.MultiValueContainer>
  );
};

export const MultiValueLabel = <
  Option extends SelectOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  children,
  ...props
}: MultiValueGenericProps<Option, IsMulti, Group>) => {
  const value = props.data.value;
  const selectOptions = props.selectProps.value as MultiValue<Option>;
  const { t } = useTranslation();

  const index = selectOptions.findIndex((option) => option.value === value);

  const hasMultipleSelected = selectOptions.length > 1 && index === 0;

  return (
    <components.MultiValueLabel {...props}>
      {hasMultipleSelected
        ? t('components.select.selected', { selected: selectOptions.length })
        : children}
    </components.MultiValueLabel>
  );
};

export const MultiValueRemove = <
  Option extends unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  selectRef,
  innerProps,
  ...props
}: MultiValueRemoveProps<Option, IsMulti, Group> & {
  selectRef: RefObject<SelectInstance<Option, IsMulti, Group>> | null;
}) => {
  const handleClear = selectRef?.current?.clearValue;

  return (
    <components.MultiValueRemove innerProps={{ ...innerProps, onClick: handleClear }} {...props}>
      <IconContainer
        Icon={CloseIcon}
        className='text-font-primary hover:text-white'
        paddingSize='none'
        size='sm'
      />
    </components.MultiValueRemove>
  );
};

const Chip = ({ children, disabled, ...props }: { children: ReactNode; disabled: boolean }) => (
  <div
    className={cx('flex gap-xxs items-center min-w-0', {
      'bg-neutral-200': !disabled,
      'bg-neutral-300': disabled,
    })}
    {...props}>
    {children}
  </div>
);

const DropdownIndicator = <
  Option extends { label: string; value: string | number },
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  size,
  ...props
}: DropdownIndicatorProps<Option, true, Group> & { size?: 'xs' | 'sm' | 'md' | 'lg' }) => {
  const isExpanded = props.selectProps.menuIsOpen;

  const Icon = isExpanded ? ChevronUpIcon : ChevronDownIcon;

  return (
    <components.DropdownIndicator {...props} className={cx({ '!p-xxs': size === 'xs' })}>
      <IconContainer Icon={Icon} paddingSize='none' />
    </components.DropdownIndicator>
  );
};

const MultiValueInput = <
  Option extends { label: string; value: string | number },
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: InputProps<Option, true, Group>
) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Backspace' && !props.value) {
      props.clearValue();
    }
  };

  return <components.Input {...props} onKeyDown={handleKeyDown} />;
};
