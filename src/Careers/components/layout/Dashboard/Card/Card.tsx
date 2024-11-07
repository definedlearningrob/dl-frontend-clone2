import cx from 'classnames';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  white?: boolean;
  id?: string;
};

const DashboardCard = ({ children, className, id, white }: Props) => {
  const classes = cx('dashboard-card', className, { '-white': white });

  return (
    <div className={classes} id={id}>
      {children}
    </div>
  );
};

export default DashboardCard;
