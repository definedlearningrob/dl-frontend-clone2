import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ReactComponent as Add } from '@shared/svg/add.svg';
import Icon from '@shared/components/Icon/Icon';

DashboardAddCourseCard.propTypes = {
  onClick: PropTypes.func,
};

function DashboardAddCourseCard({ onClick }) {
  const { t } = useTranslation();

  return (
    <Link to='/courses'>
      <div className='add-course-card' onClick={onClick}>
        <div className='add-course-card__container'>
          <Icon className='add-course-card__icon' icon={<Add />} />
          <span>{t('dashboard.addCourseCard.text1')}</span>
          <span>{t('dashboard.addCourseCard.text2')}</span>
        </div>
      </div>
    </Link>
  );
}

export default DashboardAddCourseCard;
