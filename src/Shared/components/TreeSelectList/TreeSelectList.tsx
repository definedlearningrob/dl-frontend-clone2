import { isEmpty } from 'lodash-es';
import { ChangeEvent, useMemo, useState } from 'react';

import { cx } from '@shared/utils/cx';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { ReactComponent as SearchIcon } from '@shared/svg/search.svg';

import { TreeSelectListItem, TreeSelectOption } from './TreeSelectListItem';
import { SelectedValueChip } from './SelectedValueChip';
import { flattenOptions } from './helpers';
import { TreeSelectListSkeleton } from './TreeSelectListSkeleton';

type Props = {
  options: TreeSelectOption[];
  placeholder: string;
  label: string;
  isLoading?: boolean;
  isRequired?: boolean;
  value: string[];
  onChange: (newValue: string[]) => void;
};

export const TreeSelectList = ({
  options,
  placeholder,
  label,
  isLoading,
  isRequired,
  value,
  onChange,
}: Props) => {
  const [searchValue, setSearchValue] = useState('');

  const hasSelectedValues = !isEmpty(value);

  const normalizedOptions = useMemo(
    () =>
      flattenOptions(options).reduce((acc, option) => {
        acc[option.value] = option;

        return acc;
      }, {} as { [key: string]: TreeSelectOption }),
    [options]
  );

  const selectedOptions = value.map((item) => normalizedOptions[item]);

  const handleRemoveValue = (valueToRemove: string) => {
    const filteredValues = value.filter((value) => value !== valueToRemove);
    onChange(filteredValues);
  };

  const handleChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const getFilterOptions = (options: TreeSelectOption[]): TreeSelectOption[] =>
    options.flatMap((option) => {
      if (option.label.toLowerCase().includes(searchValue.toLowerCase())) {
        return [option];
      }

      const children = getFilterOptions(option.children);

      if (children.length > 0) {
        return [{ ...option, children }];
      }

      return [];
    });

  return (
    <>
      <div className='mb-sm'>
        <label className='flex gap-xxs text-xs leading-lg mb-xs' htmlFor='tree-select-input'>
          {isRequired && <span className='text-danger-600'>*</span>}
          {label}
        </label>
        <div
          className={cx(
            'flex items-center flex-wrap gap-xs bg-white transition-colors border rounded-sm max-h-[122px] scrollbar',
            'border-neutral-300 hover:border-neutral-400 focus-within:!border-primary-500',
            {
              'px-xs py-xxs': hasSelectedValues,
              'p-xs': !hasSelectedValues,
            }
          )}>
          {selectedOptions.map((option) => (
            <SelectedValueChip key={option!.value} option={option!} onRemove={handleRemoveValue} />
          ))}
          {!hasSelectedValues && (
            <IconContainer Icon={SearchIcon} className='text-neutral-400' paddingSize='none' />
          )}
          <input
            className='flex-1 min-w-[25%] outline-none text-xs placeholder:text-font-secondary'
            id='tree-select-input'
            placeholder={hasSelectedValues ? '' : placeholder}
            value={searchValue}
            onChange={handleChangeSearchValue}
          />
        </div>
      </div>
      {isLoading && <TreeSelectListSkeleton />}
      {!isLoading && (
        <ul className='h-[280px] scrollbar'>
          {getFilterOptions(options).map((option) => (
            <TreeSelectListItem
              key={option.value}
              option={option}
              selectedValues={value}
              onChange={onChange}
            />
          ))}
        </ul>
      )}
    </>
  );
};
