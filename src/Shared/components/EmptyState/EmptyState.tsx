import { ReactNode } from 'react';
import cx from 'classnames';

import { ReactComponent as EmptyCheckInsIcon } from '@shared/svg/check_in.svg';

type Props = {
  children?: ReactNode;
  heading?: string;
  headingClassName?: string;
  className?: string;

  icon?: ReactNode;
};

const defaultIcons = (
  <>
    <EmptyCheckInsIcon />
    <EmptyCheckInsIcon />
  </>
);

const EmptyState = ({
  icon = defaultIcons,
  children,
  heading,
  className,
  headingClassName,
}: Props) => {
  const classes = cx(
    'flex flex-col justify-center items-center bg-white rounded-sm height-[305px] w-full',
    className
  );

  return (
    <div className={classes}>
      <div className='flex flex-col justify-center items-center mb-sm [&>*]:m-xxs'>{icon}</div>
      <h6 className={cx('mb-xs', headingClassName)}>{heading}</h6>
      {children}
    </div>
  );
};

export default EmptyState;
