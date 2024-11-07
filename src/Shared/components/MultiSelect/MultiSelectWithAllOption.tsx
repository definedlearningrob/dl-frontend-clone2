import { MouseEvent } from 'react';
import { GroupBase, OptionProps } from 'react-select';
import { t } from 'i18next';

import { Option } from '@shared/components/Select/Option';

export const ALL_OPTION = {
  label: t('components.asyncSelect.all'),
  value: '__all-options-selected',
};

export const MultiSelectWithAllOption = <
  Option extends { label: string; value: string | number },
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  innerProps,
  ...props
}: OptionProps<Option, true, Group> & { size: 'sm' | 'md' | 'lg' }) => {
  const { onClick, ...optionInnerProps } = innerProps;
  const { getValue, data, setValue, isSelected } = props;

  const onOptionClick = (event: MouseEvent<HTMLDivElement>) => {
    if (data.value === ALL_OPTION.value) {
      !isSelected && setValue([data], 'select-option', data);

      return;
    }

    const selectedOptions = getValue();
    const isAllOptionSelected = selectedOptions.some((option) => option.value === ALL_OPTION.value);

    if (isAllOptionSelected) {
      setValue([data], 'select-option', data);
    } else if (selectedOptions.length === 1 && isSelected) {
      setValue([ALL_OPTION as Option], 'deselect-option', data);
    } else {
      onClick?.(event);
    }
  };

  return <Option innerProps={{ ...optionInnerProps, onClick: onOptionClick }} {...props} />;
};
