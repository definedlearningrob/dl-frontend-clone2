import { ReactNode } from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';

import { cx } from '@shared/utils/cx';

import styles from './Tooltip.module.sass';

type Props = {
  children: ReactNode;
  message: ReactNode;
  className?: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  delayDuration?: number;
  skipDelayDuration?: number;
  sideOffset?: number;
  disabled?: boolean;
  open?: boolean;
  contentClassName?: string;
  directChildren?: boolean;
  variant?: 'dark' | 'light';
  container?: RadixTooltip.TooltipPortalProps['container'];
};

export const Tooltip = ({
  children,
  message,
  side = 'top',
  delayDuration = 300,
  skipDelayDuration = 300,
  sideOffset = 5,
  disabled,
  open,
  directChildren,
  className,
  contentClassName,
  variant = 'dark',
  container,
}: Props) => {
  const mergedContentClassName = cx(styles.tooltipContent, contentClassName, {
    'text-white bg-neutral-800': variant === 'dark',
    'text-font-primary bg-white': variant === 'light',
  });

  const arrowClassName = cx({
    'fill-neutral-800': variant === 'dark',
    'fill-white': variant === 'light',
  });

  return (
    <RadixTooltip.Provider delayDuration={delayDuration} skipDelayDuration={skipDelayDuration}>
      <RadixTooltip.Root open={open} {...(disabled && { open: false })}>
        <RadixTooltip.Trigger asChild={true}>
          {directChildren ? children : <span {...(className && { className })}>{children}</span>}
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal {...(container && { container })}>
          <RadixTooltip.Content
            className={mergedContentClassName}
            forceMount={true}
            side={side}
            sideOffset={sideOffset}>
            {message}
            <RadixTooltip.Arrow className={arrowClassName} />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};
