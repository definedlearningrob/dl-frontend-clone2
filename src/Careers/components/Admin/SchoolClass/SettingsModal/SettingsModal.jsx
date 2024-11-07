import { useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import updateSchoolClassSettingsMutation from '@dc/graphql/user/mutations/updateSchoolClassSettings';
import { CAREER_COURSE_SETTINGS_TYPES } from '@dc/resources/constants';

import SharedCheckbox from '@shared/components/Checkbox/Checkbox';
import SharedModal from '@shared/components/Modal/Modal';
import { callToast } from '@shared/components/Toaster/Toaster';

import '@dc/components/Admin/SchoolClass/SettingsModal/SettingModal.sass';

AdminSchoolClassSettingsModal.propTypes = {
  middleSchoolValueToSet: PropTypes.oneOf([
    CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL,
    CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL,
  ]),
  onClose: PropTypes.func,
  schoolClass: PropTypes.shape({
    name: PropTypes.string,
    uuid: PropTypes.string,
  }),
};

function AdminSchoolClassSettingsModal({ schoolClass, onClose, middleSchoolValueToSet }) {
  const { t } = useTranslation();
  const [applyToAllStudents, setApplyToAllStudents] = useState(false);
  const [updateSettings, { loading }] = useMutation(updateSchoolClassSettingsMutation);
  const warningInfoClasses = cx('school-class-settings-modal__warning', {
    '-visible': applyToAllStudents,
  });

  const saveSetting = async () => {
    try {
      await updateSettings({
        variables: {
          input: {
            uuid: schoolClass.uuid,
            force: applyToAllStudents,
            settings: {
              assessmentType: middleSchoolValueToSet,
            },
          },
        },
      });

      callToast('success', t('admin.schoolClasses.settings.saved'));

      onClose();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('error', error);
    }
  };

  const toggleApplyToAllStudents = () => setApplyToAllStudents(!applyToAllStudents);

  return (
    <SharedModal data-testid='settings-modal' isOpen={true} onDismiss={onClose}>
      <SharedModal.Header>
        <SharedModal.Heading>{t('admin.schoolClasses.settings.modalHeader')}</SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <p className='school-class-settings-modal__info'>
          {t('admin.schoolClasses.settings.modifyInfo', {
            schoolClass: schoolClass.name,
          })}{' '}
          <strong className='school-class-settings-modal__value'>{middleSchoolValueToSet}</strong>
        </p>
        <SharedCheckbox
          checked={applyToAllStudents}
          data-testid='overwrite-checkbox'
          label={t('admin.schoolClasses.settings.applyForAllStudents')}
          onChange={toggleApplyToAllStudents}
        />
        <p className={warningInfoClasses} data-testid='warning-info'>
          {t('admin.schoolClasses.settings.warning', {
            schoolClass: schoolClass.name,
          })}
        </p>
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button
          data-testid='save-settings-button'
          isLoading={loading}
          variant='primary'
          onClick={saveSetting}>
          {t('common.actions.save')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
}

export default AdminSchoolClassSettingsModal;
