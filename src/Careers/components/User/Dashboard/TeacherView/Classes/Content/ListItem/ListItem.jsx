import cx from 'classnames';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import UserDemoLabel from '@dc/components/User/shared/DemoLabel/DemoLabel';
import { EDUCATIONAL_RESOURCE_TYPES, CAREER_COURSE_SETTINGS_TYPES } from '@dc/resources/constants';

import { StageLabel } from '@shared/components/StageLabel';
import SharedDropdown from '@shared/components/Dropdown/Dropdown';

UserDashboardTeacherViewClassesContentListItem.propTypes = {
  schoolClass: PropTypes.shape({
    enrolledCoursesCount: PropTypes.number,
    entityName: PropTypes.string,
    finishedAssessmentsCount: PropTypes.number,
    finishedCoursesCount: PropTypes.number,
    gradingNeeded: PropTypes.bool,
    isDemo: PropTypes.bool,
    schoolClassName: PropTypes.string,
    schoolClassUuid: PropTypes.string,
    settings: PropTypes.shape({
      assessmentType: PropTypes.oneOf([
        CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL,
        CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL,
      ]),
    }),
    studentsCount: PropTypes.number,
  }),
  setSelectedClass: PropTypes.func,
};

function UserDashboardTeacherViewClassesContentListItem({ schoolClass, setSelectedClass }) {
  const { t } = useTranslation();
  const { uuid } = useParams();
  const history = useHistory();

  const progressText = (target, value) => `${value}/${target}`;

  const nameCellClasses = cx('teacher-dashboard__classes__name-cell table-cell-1', {
    '-grading': schoolClass.gradingNeeded,
  });

  const handleActionClick = (action) => () => setSelectedClass({ action, schoolClass });

  const handleRedirectToClass = () => {
    const location = {
      pathname: `/classes/${schoolClass.schoolClassUuid}`,
      state: {
        classUserUuid: uuid,
      },
    };

    history.push(location);
  };

  return (
    <li
      className='teacher-dashboard__classes__list-item'
      data-testid='teacher-dashboard-schoolclass'
      onClick={handleRedirectToClass}>
      <div className={nameCellClasses}>
        {schoolClass.gradingNeeded && (
          <div
            className='teacher-dashboard__classes__review-indicator'
            data-testid='review-indicator'>
            {t('user.dashboard.classes.needsReview')}
          </div>
        )}
        <span className='teacher-dashboard__classes__entity-name'>{schoolClass.entityName}</span>
        <h3 className='teacher-dashboard__classes__class-name'>
          {schoolClass.schoolClassName}
          <StageLabel
            inline={true}
            resourceType={EDUCATIONAL_RESOURCE_TYPES.SCHOOLCLASS}
            stage={schoolClass.settings.assessmentType}
          />
          {schoolClass.isDemo && <UserDemoLabel />}
        </h3>
      </div>
      <div
        className='teacher-dashboard__classes__student-cell table-cell-2'
        data-testid='teacher-dashboard-schoolclass-students'>
        &nbsp; {schoolClass.studentsCount}
      </div>
      <div
        className='teacher-dashboard__classes__assessments-cell table-cell-3'
        data-testid='teacher-dashboard-schoolclass-assessments'>
        &nbsp; {schoolClass.finishedAssessmentsCount}
      </div>
      <div
        className='teacher-dashboard__classes__courses-cell table-cell-4'
        data-testid='teacher-dashboard-schoolclass-courses'>
        {progressText(schoolClass.enrolledCoursesCount, schoolClass.finishedCoursesCount)}
      </div>
      <div className='teacher-dashboard__classes__actions-cell table-cell-5'>
        <SharedDropdown>
          <SharedDropdown.Dropdown>
            <SharedDropdown.Trigger />
            <SharedDropdown.Options>
              <SharedDropdown.Option onClick={handleActionClick('announcement')}>
                {t('user.dashboard.classes.dropdown.makeAnnouncement')}
              </SharedDropdown.Option>
              <SharedDropdown.Option onClick={handleActionClick('report')}>
                {t('user.dashboard.classes.dropdown.generateReport')}
              </SharedDropdown.Option>
            </SharedDropdown.Options>
          </SharedDropdown.Dropdown>
        </SharedDropdown>
      </div>
    </li>
  );
}

export default UserDashboardTeacherViewClassesContentListItem;
