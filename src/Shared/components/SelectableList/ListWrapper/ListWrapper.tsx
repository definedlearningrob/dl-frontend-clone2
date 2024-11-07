import { ReactNode } from 'react';

import { ListHeading } from '@shared/components/SelectableList/ListHeading/ListHeading';

type Props = {
  children: ReactNode;
  actions?: ReactNode;
  title: string;
};

export const ListWrapper = ({ children, actions, title }: Props) => (
  <section className='basis-1/2 flex flex-col border border-neutral-300 rounded-sm overflow-hidden bg-white h-[635px]'>
    <ListHeading actions={actions} title={title} />
    {children}
  </section>
);
