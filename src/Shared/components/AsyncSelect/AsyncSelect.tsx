import { useCallback } from 'react';
import { debounce, isEmpty } from 'lodash-es';
import { GroupBase, OptionsOrGroups } from 'react-select';

import { ALL_OPTION } from '@shared/components/MultiSelect';
import { Select, SelectProps } from '@shared/components/Select';

export type AsyncSelectProps<
  Option extends { label: string; value: string | number },
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = Omit<SelectProps<Option, IsMulti, Group>, 'isAsync'> & {
  loadOptions: (inputValue: string) => Promise<OptionsOrGroups<Option, Group>>;
  showAllOption?: boolean;
  label?: string;
  excludedValues?: Option['value'][];
  name: string;
};

export const AsyncSelect = <
  Option extends { label: string; value: string | number },
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  isMulti,
  loadOptions,
  showAllOption,
  excludedValues,
  ...props
}: AsyncSelectProps<Option, IsMulti, Group>) => {
  const shouldDisplayAllOption = isMulti && showAllOption;

  const loadSuggestedOptions = useCallback(
    debounce((inputValue, callback) => {
      loadOptions(inputValue).then((newOptions) => {
        const filteredOptions = excludedValues
          ? newOptions.filter(
              (option) => !('value' in option) || !excludedValues.includes(option.value)
            )
          : newOptions;
        const options =
          shouldDisplayAllOption && isEmpty(inputValue)
            ? [ALL_OPTION, ...filteredOptions]
            : filteredOptions;

        callback(options);
      });
    }, 300),
    [loadOptions, excludedValues]
  );

  const commonProps = {
    cacheOptions: true,
    defaultOptions: true,
    inputId: 'async-select',
    isAsync: true,
    loadOptions: loadSuggestedOptions,
    menuPortalTarget: document.body,
  } as const;

  return <Select {...props} {...commonProps} isMulti={isMulti} />;
};
