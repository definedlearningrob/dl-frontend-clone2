import { ReactNode } from 'react';
import cx from 'classnames';

import { ReactComponent as DoneIcon } from '@shared/svg/done.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

type Props = {
  children: ReactNode;
  isSelected: boolean;
};

export const DropdownItem = ({ children, isSelected }: Props) => {
  const classNames = cx(
    'flex items-center gap-xs justify-between',
    'cursor-pointer py-xs px-sm focus-visible:!outline-0 hover:bg-neutral-200 rounded-sm',
    { 'text-primary-500': isSelected }
  );

  return (
    <div className={classNames}>
      {children}
      {isSelected && <IconContainer Icon={DoneIcon} paddingSize='none' />}
    </div>
  );
};
