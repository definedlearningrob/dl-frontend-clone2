import cx from 'classnames';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

type NeededProps = 'className' | 'onClick';

type Props = Pick<ComponentPropsWithoutRef<'div'>, NeededProps> & {
  icon: ReactNode;
  negative?: boolean;
  placeholder?: string;
  size?: 'xxs' | 'xs' | 'sm' | 'base' | 'md' | 'lg';
  testId?: string;
};

function SharedIcon({ className, icon, negative, placeholder, size, onClick, testId }: Props) {
  const classes = cx('icon', className, {
    [`-${size}-size`]: size,
    '-negative': negative,
  });

  return (
    <>
      <div className={classes} data-testid={testId || 'icon'} onClick={onClick}>
        {icon}
      </div>
      {placeholder && <p className='image-input__icon-placeholder'>{placeholder}</p>}
    </>
  );
}

export default SharedIcon;
