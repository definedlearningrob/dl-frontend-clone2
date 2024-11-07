import cx from 'classnames';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import '@dc/shared/ReviewIndicator/ReviewIndicator.sass';

SharedReviewIndicator.propTypes = {
  className: PropTypes.string,
};

function SharedReviewIndicator({ className }) {
  const { t } = useTranslation();
  const classes = cx('review-indicator', {
    [className]: className,
  });

  return (
    <div className={classes} data-testid='review-indicator'>
      <div className='review-indicator__label' />
      <span className='review-indicator__text'>{t('user.classList.needsReview')}</span>
    </div>
  );
}

export default SharedReviewIndicator;
