import type { PropsWithChildren, ReactNode } from 'react';

type Props = PropsWithChildren<{
  header: ReactNode;
}>;

export const GuestContentWrapper = ({ header, children }: Props) => (
  <main className='bg-neutral-200 min-h-screen'>
    {header}
    {children}
  </main>
);
