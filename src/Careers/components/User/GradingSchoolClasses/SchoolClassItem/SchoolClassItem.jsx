import cx from 'classnames';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import SharedReviewIndicator from '@dc/shared/ReviewIndicator/ReviewIndicator';
import { EDUCATIONAL_RESOURCE_TYPES, CAREER_COURSE_SETTINGS_TYPES } from '@dc/resources/constants';

import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as ClassIcon } from '@shared/svg/class.svg';
import { ReactComponent as RightIcon } from '@shared/svg/arrow_forward.svg';
import { StageLabel } from '@shared/components/StageLabel';

import '@dc/components/User/GradingSchoolClasses/SchoolClassItem/ShoolClassItem.sass';

UserGradingSchoolClassesSchoolClassItem.propTypes = {
  schoolClass: PropTypes.shape({
    gradingByCourseNeeded: PropTypes.bool,
    name: PropTypes.string,
    parentName: PropTypes.string,
    settings: PropTypes.shape({
      assessmentType: PropTypes.oneOf([
        CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL,
        CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL,
      ]),
    }),
    uuid: PropTypes.string,
  }),
};

function UserGradingSchoolClassesSchoolClassItem({
  schoolClass: { gradingByCourseNeeded, name, parentName, settings, uuid },
}) {
  const { t } = useTranslation();
  const history = useHistory();
  const { courseId } = useParams();

  const listItemClasses = cx('grading-schoolclass-item', { '-need-review': gradingByCourseNeeded });

  const linkClasses = cx('grading-schoolclass-item__link', {
    '-need-review': gradingByCourseNeeded,
  });

  const goToSchoolClass = () => {
    history.push(`/courses/${courseId}/grading-schoolclasses/${uuid}`);
  };

  return (
    <li
      className={listItemClasses}
      data-testid='grading-schoolclass-item'
      onClick={goToSchoolClass}>
      <div className='grading-schoolclass-item__icon-wrapper'>
        <SharedIcon icon={<ClassIcon />} size='sm' />
      </div>
      <div className='grading-schoolclass-item__name-wrapper'>
        <h3 className='grading-schoolclass-item__parent-name'>{parentName}</h3>
        <h2 className='grading-schoolclass-item__name'>
          {name}
          <StageLabel
            inline={true}
            resourceType={EDUCATIONAL_RESOURCE_TYPES.SCHOOLCLASS}
            stage={settings.assessmentType}
          />
        </h2>
      </div>
      {gradingByCourseNeeded && <SharedReviewIndicator />}
      <div className={linkClasses} onClick={goToSchoolClass}>
        <span className='grading-schoolclass-item__link-text'>{t('user.grading.review')}</span>
        <SharedIcon icon={<RightIcon />} size='xs' />
      </div>
    </li>
  );
}

export default UserGradingSchoolClassesSchoolClassItem;
