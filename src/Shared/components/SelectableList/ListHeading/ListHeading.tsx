import { ReactNode } from 'react';

import { Tooltip } from '@shared/components/Tooltip';

type Props = {
  title: string;
  actions?: ReactNode;
};

export const ListHeading = ({ title, actions }: Props) => (
  <div className='py-xs pl-base pr-x bg-neutral-200 flex items-center justify-between min-h-[56px]'>
    <Tooltip className='truncate' delayDuration={500} message={title}>
      <h5 className='mb-0 text-sm truncate'>{title}</h5>
    </Tooltip>
    {actions && actions}
  </div>
);
