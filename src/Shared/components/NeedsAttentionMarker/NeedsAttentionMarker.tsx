import cx from 'classnames';
import { ComponentProps } from 'react';

import { Kicker } from '@shared/components/Kicker';
type Props = {
  className?: string;
  text: string;
  size?: ComponentProps<typeof Kicker>['size'];
};

export const NeedsAttentionMarker = ({ text, size = 'sm', className }: Props) => {
  const kickerClassname = cx(
    className,
    'before:left-0 before:top-0',
    'before:absolute before:h-full before:w-[2px]',
    'before:bg-secondary-500 before:inline-block'
  );

  return (
    <Kicker className={kickerClassname} size={size} variant='secondary'>
      {text}
    </Kicker>
  );
};
