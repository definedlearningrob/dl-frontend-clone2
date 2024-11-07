import { useState } from 'react';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import { useMemo } from 'react';

import updateEntitySettingsMutation from '@dc/graphql/user/mutations/updateEntitySettings';
import { TEntity } from '@dc/graphql/user/queries/entity';
import { TSettings } from '@dc/graphql/user/queries/entity';

import SharedCheckbox from '@shared/components/Checkbox/Checkbox';
import SharedModal from '@shared/components/Modal/Modal';
import { callToast } from '@shared/components/Toaster/Toaster';

type TSettingNames = keyof TSettings;

type Props = {
  entity: TEntity;
  onClose: () => void;
  setting: {
    value: string | boolean;
    name: TSettingNames;
  };
};

function AdminEntitySettingsModal({ entity, onClose, setting }: Props) {
  const { t } = useTranslation();
  const [applyToAllStudents, setApplyToAllStudents] = useState(false);
  const [applyToHierarchy, setApplyToHierarchy] = useState(false);
  const [updateSettings, { loading }] = useMutation(updateEntitySettingsMutation);

  const warningInfoClasses = cx('admin-entity__settings-modal__warning', {
    '-visible': applyToAllStudents,
  });

  const isAssessmentRelatedSetting = useMemo(
    () => ['onboardingEnabled', 'assessmentEnabled'].includes(setting.name),
    [setting]
  );

  const assessmentRelatedSettings = useMemo(() => {
    const { assessmentEnabled, onboardingEnabled } = entity.settings;
    const isTurningOnboardingOn = setting.name === 'onboardingEnabled' && setting.value;
    const isTurningAssessmentOff = setting.name === 'assessmentEnabled' && !setting.value;
    const shouldAdditionalyUpdateAssessmentSetting = isTurningOnboardingOn && !assessmentEnabled;
    const shouldAdditionalyUpdateOnboardingSetting = isTurningAssessmentOff && onboardingEnabled;

    if (shouldAdditionalyUpdateAssessmentSetting) {
      return {
        assessmentEnabled: { value: true, applyToHierarchy, force: applyToAllStudents },
        onboardingEnabled: { value: true, applyToHierarchy, force: applyToAllStudents },
      };
    }

    if (shouldAdditionalyUpdateOnboardingSetting) {
      return {
        assessmentEnabled: { value: false, applyToHierarchy, force: applyToAllStudents },
        onboardingEnabled: { value: false, applyToHierarchy, force: applyToAllStudents },
      };
    }

    return {
      [setting.name]: { value: setting.value, applyToHierarchy, force: applyToAllStudents },
    };
  }, [entity, setting, applyToAllStudents, applyToHierarchy]);

  const settingsPayload = useMemo(
    () =>
      isAssessmentRelatedSetting
        ? assessmentRelatedSettings
        : {
            [setting.name]: { value: setting.value, applyToHierarchy, force: applyToAllStudents },
          },
    [isAssessmentRelatedSetting, assessmentRelatedSettings, setting]
  );

  const saveSetting = async () => {
    const entityDataCacheId = {
      uuid: entity.uuid,
      __typename: 'EntityData',
    };

    try {
      await updateSettings({
        variables: {
          input: {
            uuid: entity.uuid,
            settings: settingsPayload,
          },
        },
        update(cache) {
          cache.modify({
            id: cache.identify(entityDataCacheId),
            fields: {
              settings(cachedSettings) {
                return { ...cachedSettings, ...settingsPayload };
              },
            },
          });
        },
      });

      callToast('success', t('admin.entities.settings.saved'));

      onClose();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('error', error);
    }
  };

  const toggleApplyToHierarchy = () => setApplyToHierarchy(!applyToHierarchy);
  const toggleApplyToAllStudents = () => setApplyToAllStudents(!applyToAllStudents);

  const isApplyToStudentsDisabled = [
    'opportunitiesEnabled',
    'postSecondaryApplicationsEnabled',
    'classManagementEnabled',
  ].includes(setting.name);

  return (
    <SharedModal data-testid='settings-modal' isOpen={true} onDismiss={onClose}>
      <SharedModal.Header>
        <SharedModal.Heading>{t('admin.entities.settings.modalHeader')}</SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <p className='admin-entity__settings-modal__info'>
          {t('admin.entities.settings.modifyInfo', {
            entityName: entity.name,
            setting: t(`admin.entities.settings.${setting.name}`),
          })}{' '}
          <strong className='admin-entity__settings-modal__value'>
            {setting.name !== 'assessmentType'
              ? setting.value.toString().toUpperCase()
              : t(`admin.entities.settings.${setting.value}`)}
          </strong>
        </p>
        <div className='admin-entity__settings-modal__checkbox-wrapper'>
          <SharedCheckbox
            checked={applyToHierarchy}
            data-testid='hierarchy-checkbox'
            id='apply-first'
            label={t('admin.entities.settings.applyForChildren')}
            onChange={toggleApplyToHierarchy}
          />
          <SharedCheckbox
            checked={applyToAllStudents}
            data-testid='overwrite-checkbox'
            disabled={isApplyToStudentsDisabled}
            label={t('admin.entities.settings.applyForAllStudents')}
            onChange={toggleApplyToAllStudents}
          />
        </div>
        <p className={warningInfoClasses} data-testid='warning-info'>
          {t('admin.entities.settings.warning', {
            entityName: entity.name,
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

export default AdminEntitySettingsModal;
