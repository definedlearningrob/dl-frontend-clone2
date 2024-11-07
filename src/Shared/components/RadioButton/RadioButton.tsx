import React, { InputHTMLAttributes } from 'react';
import cx from 'classnames';

import styles from './RadioButton.module.sass';

export type RadioButtonProps = InputHTMLAttributes<HTMLInputElement> & {
  id?: string;
  textClassName?: string;
};

export const RadioButton = ({
  id,
  name,
  value,
  children,
  onChange,
  checked,
  className,
  textClassName,
  ...props
}: RadioButtonProps) => {
  const radioWrapper = cx(styles.radioLabel, className, { '!cursor-not-allowed': props.disabled });

  return (
    <label className={radioWrapper}>
      <input
        {...props}
        checked={checked}
        className={styles.radioInput}
        id={id}
        name={name}
        type='radio'
        value={value}
        onChange={onChange}
      />
      <div className={styles.radioSpan}>
        <span className={cx(styles.labelWrapper, textClassName)}>{children}</span>
      </div>
    </label>
  );
};
