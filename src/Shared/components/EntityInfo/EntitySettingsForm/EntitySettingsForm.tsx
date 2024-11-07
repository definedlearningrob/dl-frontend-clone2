import { Trans, useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';
import { ChangeEvent, useMemo } from 'react';

import { ReactComponent as ReportIcon } from '@dc/assets/icons/generate-report.svg';
import { ReactComponent as EducationalStageIcon } from '@dc/svg/educationalStage_icon.svg';

import { ReactComponent as TeamIcon } from '@shared/assets/icons/projectTeam.svg';
import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';
import { SchoolYearDatePicker } from '@shared/components/EntityInfo/SchoolYearDatePicker';
import { EntitySettingsFormValues, useEntity } from '@shared/hooks/useEntity';
import Checkbox from '@shared/components/Checkbox/Checkbox';
import { ToggleSwitchTile } from '@shared/components/ToggleSwitchTile';

function entitySettingsFormKeys(values: EntitySettingsFormValues) {
  return Object.keys(values) as (keyof EntitySettingsFormValues)[];
}

export const EntitySettingsForm = () => {
  const { t } = useTranslation();
  const { availableSettings, entity } = useEntity();
  const { values, handleChange, setFieldValue, initialValues } =
    useFormikContext<EntitySettingsFormValues>();

  const changedValues = useMemo(
    () =>
      entitySettingsFormKeys(values).filter(
        (valueKey) => values?.[valueKey]?.value !== initialValues?.[valueKey]?.value
      ),
    [values]
  );

  const handleSettingToggle = (e: ChangeEvent<HTMLInputElement>) => {
    const { name: settingName } = e.currentTarget;
    const isEnablingOnboarding =
      availableSettings.hasOnboardingSetting &&
      settingName === 'onboardingEnabled.value' &&
      !values?.onboardingEnabled?.value;
    const isDisablingAssessment =
      availableSettings.hasAssessmentEnabledSetting &&
      settingName === 'assessmentEnabled.value' &&
      values?.assessmentEnabled?.value;

    if (isEnablingOnboarding) {
      setFieldValue('assessmentEnabled.value', true);
    }
    if (isDisablingAssessment) {
      setFieldValue('onboardingEnabled.value', false);
    }

    handleChange(e);
  };

  const assessmentGradeTooltipContent = (
    <Trans i18nKey='entityInfo.settings.gradLevelTooltipInfo'>
      <a
        className='text-warning-500 underline hover:!text-warning-600'
        href='https://support.definedlearning.com/article/154-defined-careers-middle-high-school-content'
        target='_blank'>
        mock
      </a>
    </Trans>
  );

  const settingClasses = 'flex flex-col gap-xs mb-base';

  return (
    <>
      {availableSettings.hasAssessmentEnabledSetting && (
        <div className={settingClasses}>
          <ToggleSwitchTile
            Icon={ReportIcon}
            additionalInfo={t('entityInfo.settings.assessmentTooltipInfo')}
            description={t('entityInfo.settings.assessmentInfo')}
            isEnabled={!!values?.assessmentEnabled?.value}
            name='assessmentEnabled.value'
            title={t('entityInfo.settings.assessment')}
            onChange={handleSettingToggle}
          />
          <Checkbox
            checked={values?.assessmentEnabled?.applyToHierarchy}
            disabled={!changedValues.includes('assessmentEnabled')}
            id='assessmentEnabled.applyToHierarchy'
            label={t('admin.entities.settings.applyForChildren')}
            name='assessmentEnabled.applyToHierarchy'
            onChange={handleSettingToggle}
          />
        </div>
      )}
      {availableSettings.hasOnboardingSetting && (
        <div className={settingClasses}>
          <ToggleSwitchTile
            Icon={InfoIcon}
            additionalInfo={t('entityInfo.settings.onboardingTooltipInfo')}
            description={t('entityInfo.settings.onboardingInfo')}
            isEnabled={!!values?.onboardingEnabled?.value}
            name='onboardingEnabled.value'
            title={t('entityInfo.settings.onboarding')}
            onChange={handleSettingToggle}
          />
          <Checkbox
            checked={values?.onboardingEnabled?.applyToHierarchy}
            disabled={!changedValues.includes('onboardingEnabled')}
            id='onboardingEnabled.applyToHierarchy'
            label={t('admin.entities.settings.applyForChildren')}
            name='onboardingEnabled.applyToHierarchy'
            onChange={handleSettingToggle}
          />
        </div>
      )}
      {availableSettings.hasAssessmentTypeSetting && (
        <div className={settingClasses}>
          <ToggleSwitchTile
            Icon={EducationalStageIcon}
            additionalInfo={assessmentGradeTooltipContent}
            additionalSwitchLabel={t('admin.entities.settings.middleSchool')}
            alwaysEnabled={true}
            description={t('entityInfo.settings.educationalStageInfo', {
              resource: t('entityInfo.settings.entity'),
            })}
            isEnabled={!!values.isMiddleSchool?.value}
            name='isMiddleSchool.value'
            switchLabel={t('admin.entities.settings.highSchool')}
            title={t('entityInfo.settings.educationalStage')}
            onChange={handleSettingToggle}
          />
          <Checkbox
            checked={values?.isMiddleSchool?.applyToHierarchy}
            disabled={!changedValues.includes('isMiddleSchool')}
            id='isMiddleSchool.applyToHierarchy'
            label={t('admin.entities.settings.applyForChildren')}
            name='isMiddleSchool.applyToHierarchy'
            onChange={handleSettingToggle}
          />
        </div>
      )}
      {availableSettings.hasSelfEvaluationSetting && (
        <div className={settingClasses}>
          <ToggleSwitchTile
            Icon={TeamIcon}
            additionalInfo={t('entityInfo.settings.selfEvaluationTooltipInfo')}
            description={t('entityInfo.settings.selfEvaluationInfo')}
            isEnabled={!!values?.selfEvaluationEnabled?.value}
            name='selfEvaluationEnabled.value'
            title={t('entityInfo.settings.selfEvaluation')}
            onChange={handleSettingToggle}
          />
          <Checkbox
            checked={values?.selfEvaluationEnabled?.applyToHierarchy}
            disabled={!changedValues.includes('selfEvaluationEnabled')}
            id='selfEvaluationEnabled.applyToHierarchy'
            label={t('admin.entities.settings.applyForChildren')}
            name='selfEvaluationEnabled.applyToHierarchy'
            onChange={handleSettingToggle}
          />
        </div>
      )}
      <SchoolYearDatePicker
        disabled={true}
        schoolYearStartDate={entity.settings.schoolYearStartDate}
      />
    </>
  );
};
