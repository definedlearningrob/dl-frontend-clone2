import { GroupBase, OptionProps, components } from 'react-select';

import { ReactComponent as DoneIcon } from '@shared/svg/done.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import SharedCheckbox from '@shared/components/Checkbox/Checkbox';
import { SelectOption } from '@shared/components/Select/Select';

export const Option = <
  Option extends SelectOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: OptionProps<Option, IsMulti, Group> & { size: 'sm' | 'md' | 'lg' }
) => {
  const { isSelected, size, isMulti, children } = props;

  return (
    <components.Option {...props}>
      <div className='flex items-center'>
        {isMulti && <SharedCheckbox checked={isSelected} className='m-0' readOnly={true} />}
        <div>{children}</div>
      </div>

      {isSelected && !isMulti && (
        <IconContainer Icon={DoneIcon} paddingSize='none' size={size === 'sm' ? 'sm' : 'base'} />
      )}
    </components.Option>
  );
};
