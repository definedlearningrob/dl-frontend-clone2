import cx from 'classnames';
import { ErrorBoundary } from '@appsignal/react';
import { ReactNode } from 'react';

import { appsignal } from '@shared/utils/appSignal';

type Props = {
  children: ReactNode;
  className?: string;
};

export const MainContent = ({ children, className }: Props) => {
  const classes = cx('p-base xxxl:p-md', className);

  return (
    <div className={classes} id='read'>
      <ErrorBoundary instance={appsignal}>{children}</ErrorBoundary>
    </div>
  );
};
