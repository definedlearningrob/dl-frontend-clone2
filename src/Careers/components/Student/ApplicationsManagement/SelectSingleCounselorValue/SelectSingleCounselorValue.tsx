import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const SelectSingleCounselorValue = ({ children }: Props) => (
  <div className='text-font-primary'>{children}</div>
);
