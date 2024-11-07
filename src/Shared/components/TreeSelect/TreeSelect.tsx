import { GroupBase, InputActionMeta, OptionProps, SelectInstance, MenuProps } from 'react-select';
import { useCallback, useMemo } from 'react';
import { noop } from 'lodash-es';

import { MultiSelectProps } from '@shared/components/MultiSelect/MultiSelectWithLabel';
import { Select, SelectOption } from '@shared/components/Select';
import { TreeMenuOption } from '@shared/components/TreeSelect/TreeMenuOption';
import debounce from '@shared/utils/debounce';

import { TreeMenu } from './TreeMenu';

export type TreeSelectElement = SelectInstance<TreeSelectOption, true, GroupBase<TreeSelectOption>>;

export interface TreeSelectOption extends SelectOption {
  children: this[];
}

export const TreeSelect = <
  Option extends TreeSelectOption,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: MultiSelectProps<Option, Group> & {
    isRootSelectable?: boolean;
    onFilter?: (inputValue: string) => void;
    'data-testid'?: string;
    align?: 'left' | 'right';
  }
) => {
  const { isRootSelectable, onFilter = noop, align, ...selectProps } = props;

  const MultiSelectComponents = useMemo(
    () => ({
      Menu: (menuProps: MenuProps<Option, true, Group>) => (
        <TreeMenu align={align} {...menuProps} />
      ),
      Option: (optionProps: OptionProps<Option, true, Group>) => (
        <TreeMenuOption
          isRootSelectable={isRootSelectable}
          manualFiltering={!!props.onFilter}
          {...optionProps}
        />
      ),
    }),
    [isRootSelectable, align]
  );

  const debouncedOnFilter = useCallback(debounce(onFilter, 300), []);

  const handleInputChange = (inputValue: string, actionMeta: InputActionMeta) => {
    if (actionMeta.action === 'input-change' || actionMeta.action === 'input-blur') {
      debouncedOnFilter(inputValue);
    }
  };

  return (
    <Select
      components={MultiSelectComponents}
      // filtering is handled in the TreeMenuOption component
      filterOption={() => true}
      {...selectProps}
      isMulti={true}
      onInputChange={handleInputChange}
    />
  );
};
