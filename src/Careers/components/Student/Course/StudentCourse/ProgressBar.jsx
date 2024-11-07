import cx from 'classnames';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

StudentCourseHeaderProgressBar.propTypes = {
  target: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function StudentCourseHeaderProgressBar({ target, value }) {
  const { t } = useTranslation();
  const getProgressPercentage = () => Number(((100 * value) / target).toFixed());

  const getCourseStatus = () => {
    if (getProgressPercentage() === 0) return 'start';
    if (getProgressPercentage() === 100) return 'done';

    return 'continue';
  };

  const classes = cx('course-progress-bar', `-${getCourseStatus()}`);

  return (
    <div className={classes}>
      <div className='course-progress-bar__header'>
        <span>{t('course.header.progressBar.title')}</span>
      </div>
      <div className='course-progress-bar__range'>
        <div
          className='course-progress-bar__indicator'
          data-testid='progress-indicator'
          style={{ width: `${getProgressPercentage()}%` }}
        />
      </div>
    </div>
  );
}

export default StudentCourseHeaderProgressBar;
