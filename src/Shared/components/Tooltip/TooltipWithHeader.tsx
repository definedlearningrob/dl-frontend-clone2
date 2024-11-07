import { FC, SVGProps } from 'react';
import { ReactNode } from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';

import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';
import { cx } from '@shared/utils/cx';

import { TooltipWithHeaderContent } from './TooltipWithHeaderContent';

type Props = {
  children: ReactNode;
  content: ReactNode;
  className?: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  delayDuration?: number;
  skipDelayDuration?: number;
  sideOffset?: number;
  disabled?: boolean;
  open?: boolean;
  header: ReactNode;
  Icon?: FC<SVGProps<SVGSVGElement>>;
  iconClassName?: string;
  contentClassName?: string;
};

export const TooltipWithHeader = ({
  children,
  content,
  side = 'top',
  delayDuration = 0,
  skipDelayDuration = 300,
  sideOffset = 5,
  disabled,
  open,
  header,
  Icon = InfoIcon,
  className,
  iconClassName,
  contentClassName,
}: Props) => {
  const arrowClassName = cx('fill-white text-danger-500', {
    'fill-neutral-200 stroke-neutral-300': side === 'bottom',
  });

  return (
    <RadixTooltip.Provider delayDuration={delayDuration} skipDelayDuration={skipDelayDuration}>
      <RadixTooltip.Root open={open} {...(disabled && { open: false })}>
        <RadixTooltip.Trigger asChild={true}>
          <div {...(className && { className })}>{children}</div>
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content side={side} sideOffset={sideOffset}>
            <TooltipWithHeaderContent
              Icon={Icon}
              className={contentClassName}
              content={content}
              header={header}
              iconClassName={iconClassName}
              side={side}
            />
            <RadixTooltip.Arrow className={arrowClassName} />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};
