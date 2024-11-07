import { useMemo } from 'react';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import updateStudentSettingsMutation from '@dc/graphql/user/mutations/updateStudentSettings';
import { TStudent } from '@dc/graphql/user/queries/student';
import { EducationalSettingTypes } from '@dc/resources/enums';

import { callToast } from '@shared/components/Toaster/Toaster';
import SharedModal from '@shared/components/Modal/Modal';

import './Modal.sass';

type TSettingNames =
  | 'assessmentEnabled'
  | 'assessmentType'
  | 'onboardingEnabled'
  | 'selfEvaluationEnabled';

type Props = {
  student: TStudent;
  onClose: () => void;
  setting: {
    value: string | boolean;
    name: TSettingNames;
  };
};

function AdminStudentSettingsModal({ student, onClose, setting }: Props) {
  const { t } = useTranslation();
  const [updateSettings, { loading }] = useMutation(updateStudentSettingsMutation);

  const isAssessmentRelatedSetting = useMemo(
    () => ['onboardingEnabled', 'assessmentEnabled'].includes(setting.name),
    [setting]
  );

  const assessmentRelatedSettings = useMemo(() => {
    const { assessmentEnabled, onboardingEnabled } = student.settings;
    const isTurningOnboardingOn = setting.name === 'onboardingEnabled' && setting.value;
    const isTurningAssessmentOff = setting.name === 'assessmentEnabled' && !setting.value;
    const shouldAdditionalyUpdateAssessmentSetting =
      isTurningOnboardingOn && !assessmentEnabled.value;
    const shouldAdditionalyUpdateOnboardingSetting =
      isTurningAssessmentOff && onboardingEnabled.value;

    if (shouldAdditionalyUpdateAssessmentSetting) {
      return {
        assessmentEnabled: true,
        onboardingEnabled: true,
      };
    }

    if (shouldAdditionalyUpdateOnboardingSetting) {
      return {
        assessmentEnabled: false,
        onboardingEnabled: false,
      };
    }

    return {
      [setting.name]: setting.value,
    };
  }, [student, setting]);

  const settingsPayload = useMemo(
    () =>
      isAssessmentRelatedSetting
        ? assessmentRelatedSettings
        : {
            [setting.name]: setting.value,
          },
    [isAssessmentRelatedSetting, assessmentRelatedSettings, setting]
  );

  const saveSetting = async () => {
    try {
      await updateSettings({
        variables: {
          input: {
            uuid: student.uuid,
            settings: settingsPayload,
          },
        },
      });

      callToast('success', t('admin.student.settings.saved'));

      onClose();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('error', error);
    }
  };
  const isAssessmentTypeSetting = setting.name === 'assessmentType';
  const gradeLevelLabel =
    setting.value === EducationalSettingTypes.HIGH_SCHOOL
      ? t('admin.student.settings.middleSchool')
      : t('admin.student.settings.highSchool');

  return (
    <SharedModal data-testid='settings-modal' isOpen={true} onDismiss={onClose}>
      <SharedModal.Header>
        <SharedModal.Heading>{t('admin.student.settings.modalHeader')}</SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <p className='text-primary-500 text-base mb-sm'>
          {t('admin.student.settings.modifyInfo', {
            studentName: `${student.firstName} ${student.lastName}`,
            setting: t(`admin.student.settings.${setting.name}`),
          })}{' '}
          <strong className='text-bold'>
            {isAssessmentTypeSetting ? gradeLevelLabel : setting.value.toString().toUpperCase()}
          </strong>
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

export default AdminStudentSettingsModal;
