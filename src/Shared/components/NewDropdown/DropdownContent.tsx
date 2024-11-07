import { ReactNode } from 'react';
import cx from 'classnames';

type Props = {
  children: ReactNode;
};

export const DropdownContent = ({ children }: Props) => {
  const dropdownMenuContentClasses = cx(
    'shadow-200 min-w-[180px] bg-white rounded-xs border border-solid border-neutral-300',
    'text-font-primary text-xs font-regular leading-lg w-full py-xxs p-xxs'
  );

  return <div className={dropdownMenuContentClasses}>{children}</div>;
};
