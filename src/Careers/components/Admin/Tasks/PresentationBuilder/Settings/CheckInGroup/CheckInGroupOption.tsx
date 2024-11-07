import { GroupBase, OptionProps, components } from 'react-select';

import { CheckInGroupSelectOption } from '@dc/components/Admin/Tasks/PresentationBuilder/Settings/CheckInGroup/CheckInGroupSettings';

export const CheckInGroupOption = <
  Option extends CheckInGroupSelectOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  ...props
}: OptionProps<Option, IsMulti, Group> & { size: 'sm' | 'md' | 'lg' }) => {
  const { name, displayName } = props.data.data;

  return (
    <components.Option
      {...props}
      className='!flex !flex-col !gap-xxxs !justify-start !items-start !text-start'>
      {name && <span className='uppercase text-xxxs font-bold'> {name}</span>}
      {displayName && <span className='!text-xs'>{displayName}</span>}
    </components.Option>
  );
};
