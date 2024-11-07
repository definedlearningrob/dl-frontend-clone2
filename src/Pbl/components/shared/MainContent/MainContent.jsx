import cx from 'classnames';
import PropTypes from 'prop-types';
import { ErrorBoundary } from '@appsignal/react';

import { appsignal } from '@shared/utils/appSignal';

import '@pbl/components/shared/MainContent/MainContent.sass';

SharedMainContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

function SharedMainContent({ children, className }) {
  const classes = cx('main-content max-container', className);

  return (
    <div className={classes} id='read'>
      <ErrorBoundary instance={appsignal}>{children}</ErrorBoundary>
    </div>
  );
}

export default SharedMainContent;
