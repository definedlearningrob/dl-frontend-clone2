import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';
import { omit } from 'lodash-es';

import { TSettings } from '@shared/components/EntityInfo/types';
import { EDUCATIONAL_SETTINGS_TYPES } from '@shared/components/EntityInfo/types';
import SharedModal from '@shared/components/Modal/Modal';
import { EntitySettingsFormValues, useEntity } from '@shared/hooks/useEntity';
import { EntitySettingsForm } from '@shared/components/EntityInfo/EntitySettingsForm/EntitySettingsForm';

type Props = {
  entityName: string;
  settings: TSettings;
  showModal: boolean;
  onClose: () => void;
  onSave: (data: EntitySettingsFormValues) => void;
};

export const EntitySettingsModal = ({
  entityName,
  showModal,
  settings,
  onClose,
  onSave,
}: Props) => {
  const { t } = useTranslation();
  const { assessmentEnabled, assessmentType, onboardingEnabled, selfEvaluationEnabled } = settings;
  const isMiddleSchool = assessmentType === EDUCATIONAL_SETTINGS_TYPES.MIDDLE_SCHOOL;
  const { availableSettings } = useEntity();
  const initialValues = {
    ...(availableSettings.hasAssessmentEnabledSetting && {
      assessmentEnabled: { value: assessmentEnabled, applyToHierarchy: false },
    }),
    ...(availableSettings.hasOnboardingSetting && {
      onboardingEnabled: { value: onboardingEnabled, applyToHierarchy: false },
    }),
    ...(availableSettings.hasAssessmentTypeSetting && {
      isMiddleSchool: { value: !isMiddleSchool, applyToHierarchy: false },
    }),
    ...(availableSettings.hasSelfEvaluationSetting && {
      selfEvaluationEnabled: { value: selfEvaluationEnabled, applyToHierarchy: false },
    }),
  };

  const handleSave = (values: EntitySettingsFormValues) => {
    const assessmentType = values.isMiddleSchool?.value
      ? EDUCATIONAL_SETTINGS_TYPES.HIGH_SCHOOL
      : EDUCATIONAL_SETTINGS_TYPES.MIDDLE_SCHOOL;

    const settingsToSave = {
      ...omit(values, 'isMiddleSchool'),
      ...(availableSettings.hasAssessmentEnabledSetting && {
        assessmentType: {
          value: assessmentType,
          applyToHierarchy: !!values.isMiddleSchool?.applyToHierarchy,
        },
      }),
    };

    onSave(settingsToSave);
    onClose();
  };

  return (
    <SharedModal
      data-testid='entity-settings-modal'
      isOpen={showModal}
      variant='wide'
      onDismiss={onClose}>
      <Formik enableReinitialize={true} initialValues={initialValues} onSubmit={handleSave}>
        <Form>
          <SharedModal.Header className='!px-md !pt-md !pb-base'>
            <SharedModal.Heading>
              {entityName} {t('entityInfo.settings.entityModalHeader')}
            </SharedModal.Heading>
          </SharedModal.Header>
          <SharedModal.Body className='!mt-0 !px-md'>
            <EntitySettingsForm />
          </SharedModal.Body>
          <SharedModal.Footer>
            <SharedModal.Button size='md' variant='primary-outlined' onClick={onClose}>
              {t('common.actions.cancel')}
            </SharedModal.Button>
            <SharedModal.Button
              data-testid='save-settings-button'
              size='md'
              type='submit'
              variant='primary'>
              {t('common.actions.save')}
            </SharedModal.Button>
          </SharedModal.Footer>
        </Form>
      </Formik>
    </SharedModal>
  );
};
