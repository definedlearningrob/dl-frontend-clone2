import { components, OptionProps } from 'react-select';

import SharedAvatar from '@shared/components/Avatar/Avatar';

type BaseOptionProps = OptionProps<{ label: string; value: string }, false>;

export const CounselorOption = ({ children, ...props }: BaseOptionProps) => (
  <components.Option {...props} className='!flex items-center !justify-start'>
    <SharedAvatar className='me-xs' label={props.data.label} size='24' />
    <span className='overflow-ellipsis whitespace-nowrap overflow-hidden'>{children}</span>
  </components.Option>
);
