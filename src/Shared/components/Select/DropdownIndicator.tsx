import { DropdownIndicatorProps, GroupBase, components } from 'react-select';
import cx from 'classnames';

import { ReactComponent as ChevronDownIcon } from '@shared/svg/chevron_down.svg';
import { ReactComponent as ChevronUpIcon } from '@shared/svg/chevron_up.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

export const DropdownIndicator = <
  Option extends unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: DropdownIndicatorProps<Option, IsMulti, Group> & { size: 'sm' | 'md' | 'lg' }
) => {
  const isExpanded = props.selectProps.menuIsOpen;
  const isSmall = props.size === 'sm';

  const Icon = isExpanded ? ChevronUpIcon : ChevronDownIcon;

  return (
    <components.DropdownIndicator {...props}>
      <IconContainer
        Icon={Icon}
        className={cx('text-neutral-400', {
          'text-neutral-700': props.isFocused,
          'text-neutral-800': props.hasValue,
        })}
        paddingSize='none'
        size={isSmall ? 'sm' : 'base'}
      />
    </components.DropdownIndicator>
  );
};
