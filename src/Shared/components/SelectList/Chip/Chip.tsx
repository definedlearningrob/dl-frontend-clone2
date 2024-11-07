import { MultiValueGenericProps, components, GroupBase } from 'react-select';

import SharedAvatar from '@shared/components/Avatar/Avatar';
import { SelectOption } from '@shared/components/Select';

import styles from '../SelectList.module.sass';

export const Chip = <
  Option extends SelectOption,
  IsMulti extends boolean = true,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  children,
  showAvatar = false,
  ...props
}: MultiValueGenericProps<Option, IsMulti, Group> & { showAvatar?: boolean }) => (
  <components.MultiValueContainer {...props}>
    {showAvatar && (
      <SharedAvatar className={styles.avatar} label={props.data.label} size='24' theme='light' />
    )}
    {children}
  </components.MultiValueContainer>
);
