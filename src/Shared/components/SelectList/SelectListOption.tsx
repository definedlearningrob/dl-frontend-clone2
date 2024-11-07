import { OptionProps, components, GroupBase } from 'react-select';
import cx from 'classnames';

import SharedCheckbox from '@shared/components/Checkbox/Checkbox';
import SharedAvatar from '@shared/components/Avatar/Avatar';
import { SelectOption } from '@shared/components/Select';

import styles from './SelectList.module.sass';

export const SelectListOption = <
  Option extends SelectOption,
  IsMulti extends boolean = true,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  children,
  showAvatar = false,
  ...props
}: OptionProps<Option, IsMulti, Group> & { showAvatar?: boolean }) => (
  <components.Option
    {...props}
    className={cx('!flex bg-white gap-xs !justify-start !border-b-neutral-300 p-xs min-h-[40px]')}>
    <SharedCheckbox checked={props.isSelected} readOnly={true} />
    {showAvatar && (
      <SharedAvatar className={styles.avatar} label={props.label} size='24' theme='light' />
    )}
    {children}
  </components.Option>
);
