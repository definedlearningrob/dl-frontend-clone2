import cx from 'classnames';
import { ForwardedRef, HTMLProps, ReactNode } from 'react';

import { ReactComponent as ClearIcon } from '@dc/svg/clear.svg';

import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as AddIcon } from '@shared/svg/add.svg';
import { ReactComponent as DeleteIcon } from '@shared/svg/delete_outlined.svg';
import { ReactComponent as Download } from '@shared/svg/download_to.svg';
import { ReactComponent as DoneIcon } from '@shared/svg/done_white.svg';
import { ReactComponent as EditIcon } from '@shared/assets/icons/edit.svg';

import styles from './DeprecatedIconButtonVariants.module.sass';

import './DeprecatedIconButton.sass';

type TNeededProps =
  | 'children'
  | 'className'
  | 'disabled'
  | 'onClick'
  | 'onMouseEnter'
  | 'rel'
  | 'onMouseLeave';
export interface TSharedIconButtonProps extends Pick<HTMLProps<HTMLButtonElement>, TNeededProps> {
  'aria-label'?: string;
  'data-testid'?: string;
  buttonRef?: ForwardedRef<HTMLButtonElement>;
  icon: ReactNode;
  iconSize?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  square?: boolean;
  type?: 'button' | 'submit';
  buttonName?: string;
  variant?:
    | 'base'
    | 'primary'
    | 'primary-outlined'
    | 'secondary '
    | 'secondary-outlined'
    | 'danger'
    | 'danger-outlined';
}

function SharedIconButton({
  children,
  className,
  'aria-label': ariaLabel,
  'data-testid': dataTestId = 'icon-button',
  disabled,
  icon,
  iconSize,
  onClick,
  onMouseEnter,
  buttonRef,
  onMouseLeave,
  size,
  square,
  type = 'button',
  variant,
  ...rest
}: TSharedIconButtonProps) {
  const classes = cx(
    'icon-button',
    {
      [`-${variant}`]: variant,
      [`-size-${size}`]: size,
      '-square': square,
    },
    className
  );

  return (
    <button
      ref={buttonRef}
      aria-label={ariaLabel}
      className={classes}
      data-testid={dataTestId}
      disabled={disabled}
      type={type}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...rest}>
      <SharedIcon className='icon-button__icon' icon={icon} size={iconSize || size} />
      {children}
    </button>
  );
}

type FieldsToOmit = 'icon' | 'size';

type VariantIconButtonProps = Omit<TSharedIconButtonProps, FieldsToOmit> & {
  size?: 'xs' | 'sm' | 'md' | 'lg';
};

SharedIconButton.Add = ({ className, size, ...rest }: VariantIconButtonProps) => (
  <SharedIconButton
    className={cx(styles.editButton, className)}
    icon={<AddIcon />}
    size={size || 'xs'}
    square={true}
    {...rest}
  />
);

SharedIconButton.Download = ({ className, size, ...rest }: VariantIconButtonProps) => (
  <SharedIconButton
    className={cx(styles.editButton, className)}
    icon={<Download />}
    size={size || 'xs'}
    square={true}
    {...rest}
  />
);

SharedIconButton.Edit = ({ className, size, ...rest }: VariantIconButtonProps) => (
  <SharedIconButton
    className={cx(styles.editButton, className)}
    icon={<EditIcon />}
    size={size || 'xs'}
    square={true}
    {...rest}
  />
);

SharedIconButton.Delete = ({ className, size, ...rest }: VariantIconButtonProps) => (
  <SharedIconButton
    className={cx(styles.deleteButton, className)}
    icon={<DeleteIcon />}
    size={size || 'xs'}
    square={true}
    {...rest}
  />
);

SharedIconButton.Close = ({ className, size, ...rest }: VariantIconButtonProps) => (
  <SharedIconButton
    className={cx(styles.closeButton, className)}
    icon={<ClearIcon />}
    size={size || 'xs'}
    square={true}
    {...rest}
  />
);

SharedIconButton.Submit = ({ className, size, ...rest }: VariantIconButtonProps) => (
  <SharedIconButton
    className={cx(styles.closeButton, className)}
    icon={<DoneIcon />}
    size={size || 'xs'}
    square={true}
    variant='primary'
    {...rest}
  />
);

SharedIconButton.Cancel = ({ className, size, ...rest }: VariantIconButtonProps) => (
  <SharedIconButton
    className={cx(styles.cancelButton, className)}
    icon={<ClearIcon />}
    size={size || 'xs'}
    square={true}
    variant='danger'
    {...rest}
  />
);

export default SharedIconButton;
