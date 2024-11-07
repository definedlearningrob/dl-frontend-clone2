import { ErrorBoundary } from '@appsignal/react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import { appsignal } from '@shared/utils/appSignal';

SharedMainContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

function SharedMainContent({ children, className }) {
  const classes = cx('p-base pt-xs xxxl:p-md xxxl:pt-sm', className);

  return (
    <div className={classes} id='read'>
      <ErrorBoundary instance={appsignal}>{children}</ErrorBoundary>
    </div>
  );
}

export default SharedMainContent;
