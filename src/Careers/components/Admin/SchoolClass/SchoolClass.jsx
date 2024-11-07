import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import SettingsModal from '@dc/components/Admin/SchoolClass/SettingsModal/SettingsModal';
import { CAREER_COURSE_SETTINGS_TYPES } from '@dc/resources/constants';

import SharedSwitch from '@shared/components/Switch/Switch';
import '@dc/components/Admin/SchoolClass/SchoolClass.sass';

AdminSchoolClass.propTypes = {
  schoolClass: PropTypes.shape({
    entity: PropTypes.shape({
      name: PropTypes.string,
      uuid: PropTypes.string,
    }),
    name: PropTypes.string,
    settings: PropTypes.shape({
      assessmentType: PropTypes.oneOf([
        CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL,
        CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL,
      ]),
    }),
    uuid: PropTypes.string,
  }),
};

function AdminSchoolClass({ schoolClass }) {
  const [openModal, setModalVisibility] = useState(false);
  const { t } = useTranslation();
  const isMiddleSchool =
    schoolClass.settings.assessmentType === CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL;
  const toggleModal = () => setModalVisibility(!openModal);

  return (
    <div className='admin-school-class'>
      <h1 className='admin-school-class__heading' data-testid='school-class-name'>
        {schoolClass.name}
      </h1>
      <p className='admin-school-class__sub-heading' data-testid='school-class-entity-name'>
        {schoolClass.entity.name}
      </p>
      <div className='admin-school-class__settings'>
        <h2 className='admin-school-class__category-heading'>
          {t('admin.schoolClasses.settings.label')}
        </h2>
        <SharedSwitch
          additionalLabel={t('admin.schoolClasses.settings.middleSchool')}
          alwaysEnabled={true}
          className='admin-school-class__switch'
          data-testid='middleSchool-switch'
          label={t('admin.schoolClasses.settings.highSchool')}
          name='middleSchoolEnabled'
          value={!isMiddleSchool}
          onChange={toggleModal}
        />
      </div>
      {openModal && (
        <SettingsModal
          middleSchoolValueToSet={
            isMiddleSchool
              ? CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL
              : CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL
          }
          schoolClass={schoolClass}
          onClose={toggleModal}
        />
      )}
    </div>
  );
}

export default AdminSchoolClass;
