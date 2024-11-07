import { PropsWithChildren } from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

import SharedButton, { TSharedButtonProps } from '../Button/Button';

type NeededButtonProps =
  | 'className'
  | 'disabled'
  | 'variant'
  | 'size'
  | 'type'
  | 'Icon'
  | 'iconPlacement'
  | 'contentClassName';

type ButtonProps = Pick<TSharedButtonProps, NeededButtonProps>;

type LinkAdditionalProps = {
  linkClassName?: string;
};

type Props = PropsWithChildren<LinkProps & LinkAdditionalProps & ButtonProps>;

const Link = ({
  children,
  className,
  linkClassName,
  disabled,
  size,
  variant,
  Icon,
  type,
  contentClassName,
  iconPlacement,
  ...props
}: Props) => {
  const button = (
    <SharedButton
      children={children}
      Icon={Icon}
      className={className}
      contentClassName={contentClassName}
      disabled={disabled}
      iconPlacement={iconPlacement}
      size={size}
      type={type}
      variant={variant}
    />
  );

  if (disabled) {
    return button;
  }

  return (
    <RouterLink className={linkClassName} {...props}>
      {button}
    </RouterLink>
  );
};

export default Link;
