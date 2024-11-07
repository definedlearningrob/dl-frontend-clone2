import cx from 'classnames';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { ReactComponent as CheckmarkDoneIcon } from '@dc/svg/test-checkmark-done.svg';

import { ReactComponent as CheckmarkItemIcon } from '@shared/svg/item-checkmark.svg';
import { ReactComponent as TaskGraduateIcon } from '@shared/svg/list-task-graduate-hat.svg';

UserDashboardSharedMyReportsContent.propTypes = {
  myReports: PropTypes.shape({
    assessmentsFinished: PropTypes.number,
    assignmentsSubmitted: PropTypes.number,
    coursesEnrolled: PropTypes.number,
    coursesFinished: PropTypes.number,
  }),
  vertical: PropTypes.bool,
};

function UserDashboardSharedMyReportsContent({ myReports, vertical = false }) {
  const { t } = useTranslation();

  const listClasses = cx('teacher-dashboard__my-reports__list', 'transparent-scrollbar', {
    '-vertical': vertical,
  });

  return (
    <ul className={listClasses}>
      <li className='teacher-dashboard__my-reports__item' data-testid='my-reports-item'>
        <div className='teacher-dashboard__my-reports__icon-wrapper -success-theme'>
          <CheckmarkDoneIcon className='teacher-dashboard__my-reports__icon' />
        </div>
        <div className='teacher-dashboard__my-reports__content-wrapper'>
          <p className='teacher-dashboard__my-reports__item-name'>
            {t('user.dashboard.myReports.finishedAssessment')}
          </p>
          <div className='teacher-dashboard__my-reports__item-value'>
            {myReports.assessmentsFinished}
          </div>
        </div>
      </li>
      <li className='teacher-dashboard__my-reports__item' data-testid='my-reports-item'>
        <div className='teacher-dashboard__my-reports__icon-wrapper -primary-theme'>
          <TaskGraduateIcon className='teacher-dashboard__my-reports__icon' />
        </div>
        <div className='teacher-dashboard__my-reports__content-wrapper'>
          <p className='teacher-dashboard__my-reports__item-name'>
            {t('user.dashboard.myReports.finishedCourse')}
          </p>
          <div className='teacher-dashboard__my-reports__item-value'>
            {myReports.coursesFinished}/{myReports.coursesEnrolled}
          </div>
        </div>
      </li>
      <li className='teacher-dashboard__my-reports__item' data-testid='my-reports-item'>
        <div className='teacher-dashboard__my-reports__icon-wrapper -secondary-theme'>
          <CheckmarkItemIcon className='teacher-dashboard__my-reports__icon' />
        </div>
        <div className='teacher-dashboard__my-reports__content-wrapper'>
          <p className='teacher-dashboard__my-reports__item-name'>
            {t('user.dashboard.myReports.submittedAssignments')}
          </p>
          <div className='teacher-dashboard__my-reports__item-value'>
            {myReports.assignmentsSubmitted}
          </div>
        </div>
      </li>
    </ul>
  );
}

export default UserDashboardSharedMyReportsContent;
