import * as RadixPopover from '@radix-ui/react-popover';
import { ReactNode } from 'react';

import { cx } from '@shared/utils/cx';

import styles from './Popover.module.sass';

type Props = {
  children: ReactNode;
  content: ReactNode;
  open?: boolean;
  alignOffset?: number;
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
  contentClassName?: string;
  variant?: 'base' | 'dark';
  onOpenChange?: (open: boolean) => void;
};

export const Popover = ({
  children,
  content,
  open,
  alignOffset,
  variant = 'base',
  align,
  side,
  sideOffset = 5,
  onOpenChange,
}: Props) => {
  const isDark = variant === 'dark';

  const contentClassname = cx({
    [styles.popoverWrapper]: isDark,
  });

  const arrowClassname = cx({
    'fill-font-secondary': isDark,
    'fill-white': !isDark,
  });

  return (
    <RadixPopover.Root open={open} onOpenChange={onOpenChange}>
      <RadixPopover.Trigger>{children}</RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          align={align}
          alignOffset={alignOffset}
          className={contentClassname}
          side={side}
          sideOffset={sideOffset}>
          {content}
          <RadixPopover.Arrow className={arrowClassname} />
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
};
