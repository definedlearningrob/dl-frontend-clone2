import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import SharedEmptyContainerPlaceholder from '@dc/components/shared/EmptyContainerPlaceholder/EmptyContainerPlaceholder';
import SchoolClassItem from '@dc/components/User/GradingSchoolClasses/SchoolClassItem/SchoolClassItem';
import { CAREER_COURSE_SETTINGS_TYPES } from '@dc/resources/constants';
import '@dc/components/User/GradingSchoolClasses/GradingSchoolClasses.sass';

UserGradingSchoolClasses.propTypes = {
  courseName: PropTypes.string,
  schoolClasses: PropTypes.arrayOf(
    PropTypes.shape({
      gradingNeeded: PropTypes.bool,
      name: PropTypes.string,
      parentName: PropTypes.string,
      settings: PropTypes.shape({
        assessmentType: PropTypes.oneOf([
          CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL,
          CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL,
        ]),
      }),
      uuid: PropTypes.string,
    })
  ),
};

function UserGradingSchoolClasses({ courseName, schoolClasses }) {
  const { t } = useTranslation();

  const EmptyContainerPlaceholder = (
    <div className='grading-schoolclasses__empty-list-container'>
      <div className='grading-schoolclasses__empty-list'>
        <SharedEmptyContainerPlaceholder message={t('user.grading.emptyList')} />
      </div>
    </div>
  );

  const schoolClassesList = (
    <>
      <p className='grading-schoolclasses__list-title'>{t('user.grading.schoolClasses')}</p>
      <ul>
        {schoolClasses.map((schoolClass) => (
          <SchoolClassItem key={schoolClass.uuid} schoolClass={schoolClass} />
        ))}
      </ul>
    </>
  );

  return (
    <section className='grading-schoolclasses'>
      <h1 className='grading-schoolclasses__heading'>
        {t('user.grading.heading', { courseName })}
      </h1>
      {!schoolClasses.length ? EmptyContainerPlaceholder : schoolClassesList}
    </section>
  );
}

export default UserGradingSchoolClasses;
