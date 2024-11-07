import { GroupBase, SelectInstance } from 'react-select';
import cx from 'classnames';
import { ForwardedRef } from 'react';

import { SelectProps } from '../Select';

import { MultiSelect } from './MultiSelect';

export type MultiSelectProps<
  Option extends { label: string; value: string | number },
  Group extends GroupBase<Option>
> = SelectProps<Option, true, Group> & {
  name: string;
  label?: string;
  selectClassName?: string;
  showError?: boolean;
  errorMessage?: string;
  isCreatable?: boolean;
  selectRef?: ForwardedRef<SelectInstance<Option, true, Group>>;
  'data-testid'?: string;
};

export const MultiSelectWithLabel = <
  Option extends { label: string; value: string | number },
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  name,
  className,
  label,
  selectClassName,
  showError,
  selectRef,
  errorMessage,
  'data-testid': dataTestId,
  ...props
}: MultiSelectProps<Option, Group>) => {
  const inputId = `select-input-${name}`;

  return (
    <div className={cx('relative', className)} data-testid={dataTestId}>
      <label className='flex flex-col gap-xs'>
        {label && <span className='text-font-secondary text-xs leading-lg'>{label}</span>}
        <MultiSelect
          className={selectClassName}
          inputId={inputId}
          selectRef={selectRef}
          {...props}
        />
        {showError && (
          <div className='text-xxs text-danger-600'>{errorMessage && errorMessage}</div>
        )}
      </label>
    </div>
  );
};
