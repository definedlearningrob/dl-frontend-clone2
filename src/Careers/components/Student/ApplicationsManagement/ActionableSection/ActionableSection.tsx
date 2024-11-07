import { ReactNode } from 'react';
import cx from 'classnames';

import styles from './ActionableSection.module.sass';

type Props = {
  className?: string;
  contentClassName?: string;
  icon?: ReactNode;
  title: string | ReactNode;
  description: ReactNode;
  action?: ReactNode;
};

export const ActionableSection = ({
  icon,
  title,
  action,
  description,
  contentClassName,
}: Props) => (
  <div className='flex gap-md'>
    {icon && <div className={styles.iconWrapper}>{icon}</div>}
    <div className={cx('flex grow py-sm', contentClassName)}>
      <div className='flex flex-col grow'>
        <h4 className='text-neutral-800 font-bold leading-base text-sm xxxl:text-base'>{title}</h4>
        <p className='text-neutral-700 font-regular leading-lg mb-0 text-xs xxxl:text-sm'>
          {description}
        </p>
      </div>
      <div className='ml-auto flex items-center'>{action}</div>
    </div>
  </div>
);
