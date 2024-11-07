import cx from 'classnames';
import { ChangeEvent, MouseEvent } from 'react';

import styles from './Switch.module.sass';

type Props = {
  className?: string;
  'data-testid'?: string;
  disabled?: boolean;
  label?: string;
  labelClassName?: string;
  name?: string;
  inputId?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: MouseEvent<HTMLLabelElement>) => void;
  value: boolean;
  labelFirst?: boolean;
  additionalLabel?: string;
  alwaysEnabled?: boolean;
};

const SharedSwitch = ({
  className,
  labelClassName,
  'data-testid': dataTestId,
  disabled,
  label,
  name,
  onChange,
  onClick,
  value,
  inputId,
  labelFirst,
  additionalLabel,
  alwaysEnabled,
}: Props) => {
  const classes = cx(styles.switch, className, {
    [styles.labelFirst]: labelFirst,
    [styles.disabled]: disabled,
    [styles.alwaysEnabled]: alwaysEnabled,
  });

  const labelClasses = cx('text-xs', labelClassName);

  return (
    <label className={classes} onClick={onClick}>
      {additionalLabel && <span className={labelClasses}>{additionalLabel}</span>}
      <div className={styles.content}>
        <input
          checked={value}
          className={cx(styles.switchInput, { [styles.alwaysEnabled]: alwaysEnabled })}
          data-testid={dataTestId}
          disabled={disabled}
          id={inputId}
          name={name}
          role='switch'
          type='checkbox'
          onChange={onChange}
        />
        <span className={styles.slider} />
      </div>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};

export default SharedSwitch;
