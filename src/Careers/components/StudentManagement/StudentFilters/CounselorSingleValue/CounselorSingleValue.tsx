import { GroupBase, SingleValueProps, components } from 'react-select';

import SharedAvatar from '@shared/components/Avatar/Avatar';
import { SelectOption } from '@shared/components/Select';

export const CounselorSingleValue = <
  Option extends SelectOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  children,
  ...props
}: SingleValueProps<Option, IsMulti, Group>) => (
  <components.SingleValue {...props} className='flex items-center'>
    <SharedAvatar className='me-xs' label={props.data.label} size='24' />
    {children}
  </components.SingleValue>
);
