import cx from 'classnames';
import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { EducationalSettingTypes } from '@dc/resources/enums';
import { TSettings } from '@dc/graphql/user/queries/adminEntityInfo';

import SharedSwitch from '@shared/components/Switch/Switch';
import SharedModal from '@shared/components/Modal/Modal';
import DeprecatedTooltip from '@shared/components/DeprecatedTooltip/DeprecatedTooltip';
import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';

import '@dc/components/User/Entity/Settings/Modal/Modal.sass';

type TSettingNames =
  | 'assessmentEnabled'
  | 'assessmentType'
  | 'onboardingEnabled'
  | 'selfEvaluationEnabled';

type Props = {
  entityName: string;
  settings: TSettings;
  showModal: boolean;
  onClose: () => void;
  handleSetSettingToModify: (data: {
    name: TSettingNames | string;
    value: boolean | string;
  }) => void;
};

const Modal = ({ entityName, showModal, settings, onClose, handleSetSettingToModify }: Props) => {
  const { t } = useTranslation();
  const { assessmentEnabled, assessmentType, onboardingEnabled, selfEvaluationEnabled } = settings;
  const isMiddleSchool = assessmentType === EducationalSettingTypes.MIDDLE_SCHOOL;
  const entitySettingsClasses = (value: boolean) =>
    cx('entity-settings__section', {
      '-active': value,
    });

  const toggleSetting = ({
    target: { name },
  }: ChangeEvent & { target: { name: TSettingNames } }) => {
    handleSetSettingToModify({
      name,
      value: !settings[name],
    });
  };

  const toggleEducationalSetting = () => {
    const value = isMiddleSchool
      ? EducationalSettingTypes.HIGH_SCHOOL
      : EducationalSettingTypes.MIDDLE_SCHOOL;

    handleSetSettingToModify({
      name: 'assessmentType',
      value,
    });
  };

  const onModalClose = () => onClose();

  return (
    <SharedModal data-testid='entity-settings-modal' isOpen={showModal} onDismiss={onModalClose}>
      <SharedModal.Header>
        <SharedModal.Heading>
          {entityName} {t('admin.entities.settings.entityModalHeader')}
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <section className={entitySettingsClasses(assessmentEnabled)}>
          <div className='entity-settings__section__left'>
            <p>{t('user.entity.settings.assessment')}</p>
            <span>{t('user.entity.settings.assessmentInfo')}</span>
          </div>
          <SharedSwitch
            className='admin-entity__settings__switch'
            data-testid='assessment-switch'
            name='assessmentEnabled'
            value={assessmentEnabled}
            onChange={toggleSetting as (event: ChangeEvent<HTMLInputElement>) => void}
          />
        </section>
        <section className={entitySettingsClasses(onboardingEnabled)}>
          <div className='entity-settings__section__left'>
            <div className='entity-settings__section__left__paragraph'>
              {t('user.entity.settings.onboarding')}
              <DeprecatedTooltip message={t('user.entity.settings.tooltipInfo')} variant='dark'>
                <InfoIcon className='info-icon' />
              </DeprecatedTooltip>
            </div>
            <span>{t('user.entity.settings.onboardingInfo')}</span>
          </div>
          <SharedSwitch
            className='admin-entity__settings__switch'
            data-testid='assessment-switch'
            name='onboardingEnabled'
            value={onboardingEnabled}
            onChange={toggleSetting as (event: ChangeEvent<HTMLInputElement>) => void}
          />
        </section>
        <section className={entitySettingsClasses(isMiddleSchool)}>
          <div className='entity-settings__section__left'>
            <p>{t('user.entity.settings.middleSchool')}</p>
            <span>{t('user.entity.settings.middleSchoolInfo')}</span>
          </div>
          <SharedSwitch
            className='admin-entity__settings__switch'
            data-testid='assessment-switch'
            name='assessmentType'
            value={isMiddleSchool}
            onChange={toggleEducationalSetting}
          />
        </section>
        <section className={entitySettingsClasses(selfEvaluationEnabled)}>
          <div className='entity-settings__section__left'>
            <p>{t('user.entity.settings.selfEvaluation')}</p>
            <span>{t('user.entity.settings.selfEvaluationInfo')}</span>
          </div>
          <SharedSwitch
            className='admin-entity__settings__switch'
            data-testid='assessment-switch'
            name='selfEvaluationEnabled'
            value={selfEvaluationEnabled}
            onChange={toggleSetting as (event: ChangeEvent<HTMLInputElement>) => void}
          />
        </section>
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button
          data-testid='save-settings-button'
          size='md'
          variant='primary-outlined'
          onClick={onModalClose}>
          {t('common.actions.cancel')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};

export default Modal;
