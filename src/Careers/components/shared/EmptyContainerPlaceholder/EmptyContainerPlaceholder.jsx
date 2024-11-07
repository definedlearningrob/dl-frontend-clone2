import cx from 'classnames';
import PropTypes from 'prop-types';

import '@dc/shared/EmptyContainerPlaceholder/EmptyContainerPlaceholder.sass';

SharedEmptyContainerPlaceholder.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string.isRequired,
};

function SharedEmptyContainerPlaceholder({ className, message }) {
  const classes = cx('shared-empty-placeholder', className);

  return (
    <div className={classes} data-testid='empty-placeholder'>
      {message}
    </div>
  );
}

export default SharedEmptyContainerPlaceholder;
