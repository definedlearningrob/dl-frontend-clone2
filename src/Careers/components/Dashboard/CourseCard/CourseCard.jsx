import cx from 'classnames';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRef } from 'react';

import ProgressCircle from '@dc/shared/ProgressCircle/ProgressCircle';

import { ReactComponent as ArrowIcon } from '@shared/svg/arrow_forward.svg';
import Icon from '@shared/components/Icon/Icon';

DashboardCourseCard.propTypes = {
  id: PropTypes.string,
  image: PropTypes.string,
  lessonsCompleted: PropTypes.number,
  lessonsNumber: PropTypes.number,
  thumbnail: PropTypes.string,
  title: PropTypes.string,
  videosNumber: PropTypes.number,
  withInterActions: PropTypes.bool,
};

function DashboardCourseCard({
  id,
  image,
  lessonsCompleted,
  lessonsNumber,
  thumbnail,
  title,
  withInterActions,
}) {
  const { t } = useTranslation();
  const courseCard = useRef(null);
  const history = useHistory();
  const status =
    {
      0: 'not-started',
      1: 'completed',
    }[lessonsCompleted / lessonsNumber] || 'in-progress';

  const statusText = {
    'not-started': t('dashboard.courseCard.startLearning'),
    'in-progress': t('dashboard.courseCard.continueLearning'),
    completed: t('dashboard.courseCard.done'),
  }[status];

  useEffect(() => {
    courseCard.current.style.backgroundImage = `url(${thumbnail}), url(${image})`;
  });

  const goToCourse = () => withInterActions && history.push(`courses/${id}`);

  const courseCardClasses = cx('course-card', {
    '-disabled': !withInterActions,
  });

  const progressClasses = cx('course-card__progress-circle', {
    [`-${status}`]: status,
  });

  const buttonClasses = cx('course-card__button', {
    [`-${status}`]: status,
  });

  return (
    <div
      ref={courseCard}
      className={courseCardClasses}
      data-testid='course-card'
      onClick={goToCourse}>
      <div className='course-card__container' data-testid='current-courses-item'>
        <ProgressCircle
          className={progressClasses}
          data-testid='course-card-progress-circle'
          displayPercentageText={true}
          size='sm'
          target={lessonsNumber}
          value={lessonsCompleted}
        />
        <h2 className='course-card__header'>{title}</h2>
        <div className={buttonClasses}>
          {withInterActions && (
            <>
              {statusText}
              {status !== 'completed' && (
                <Icon className='course-card__icon -button' icon={<ArrowIcon />} size='xs' />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardCourseCard;
