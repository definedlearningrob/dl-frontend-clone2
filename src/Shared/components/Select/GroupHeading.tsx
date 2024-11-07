import { GroupBase, GroupHeadingProps } from 'react-select';

import { Kicker } from '@shared/components/Kicker';

import { SelectOption } from './Select';

export const GroupHeading = <
  Option extends SelectOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  data,
}: GroupHeadingProps<Option, IsMulti, Group>) => (
  <div className='flex items-center justify-between gap-xs bg-neutral-200 rounded-sm px-sm py-xxxs mb-xxs'>
    <Kicker className='!mb-0' size='sm' variant='dark'>
      {data.label}
    </Kicker>
    <span className='bg-white px-xs py-xxs rounded-full text-xxs font-medium h-base'>
      {data.options.length}
    </span>
  </div>
);
