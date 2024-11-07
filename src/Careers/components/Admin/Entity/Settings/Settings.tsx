import React, { ChangeEvent, FC, SVGProps, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import SettingModal from '@dc/components/Admin/Entity/Settings/Modal/Modal';
import { EducationalSettingTypes } from '@dc/resources/enums';
import { TEntity } from '@dc/graphql/user/queries/entity';
import { TSettings } from '@dc/graphql/user/queries/entity';
import { ReactComponent as HighSchoolIcon } from '@dc/assets/icons/HS_icon.svg';
import { ReactComponent as OpportunitiesIcon } from '@dc/assets/icons/opportunities_icon.svg';
import { ReactComponent as AssessmentIcon } from '@dc/assets/icons/generate-report.svg';
import { TabCard } from '@dc/components/Admin/Entity/TabCard';

import { SchoolYearDatePicker } from '@shared/components/EntityInfo/SchoolYearDatePicker';
import { useUpdateSchoolYearStartDateMutation } from '@shared/graphql/user/hooks/useUpdateSchoolYearStartDateMutation';
import { ToggleSwitchTile } from '@shared/components/ToggleSwitchTile';
import { ReactComponent as BuildingIcon } from '@shared/assets/icons/building.svg';
import { ReactComponent as OnboardingIcon } from '@shared/assets/icons/info_outlined.svg';
import { ReactComponent as SelfEvaluationIcon } from '@shared/assets/icons/user_outlined.svg';
import { ReactComponent as SettingsIcon } from '@shared/assets/icons/settings_outlined.svg';
import { ReactComponent as ClassIcon } from '@shared/assets/icons/class.svg';

type TSettingNames = keyof TSettings;

type Props = {
  entity: TEntity;
};

type SettingsChangeEvent = ChangeEvent<HTMLInputElement> & { target: { name: TSettingNames } };

type SettingsCheckboxes = {
  name: TSettingNames;
  label: string;
  value: boolean;
  alwaysEnabled?: boolean;
  additionalLabel?: string;
  switchLabel?: string;
  switchAdditionalLabel?: string;
  onChange: (event: SettingsChangeEvent) => void;
  'data-testid': string;
  icon: FC<SVGProps<SVGSVGElement>>;
};

function AdminEntitySettings({ entity }: Props) {
  const [settingToModify, setSettingToModify] = useState<{
    name: TSettingNames;
    value: boolean | string;
  } | null>(null);
  const { t } = useTranslation();
  const {
    assessmentEnabled,
    assessmentType,
    onboardingEnabled,
    opportunitiesEnabled,
    postSecondaryApplicationsEnabled,
    schoolYearStartDate,
    selfEvaluationEnabled,
    classManagementEnabled,
  } = entity.settings;
  const [updateSchoolYearStartDate] = useUpdateSchoolYearStartDateMutation();
  const { entityUuid } = useParams<{ entityUuid: string }>();

  const isMiddleSchool = assessmentType === EducationalSettingTypes.MIDDLE_SCHOOL;

  const toggleSetting = ({ target: { name } }: SettingsChangeEvent) => {
    setSettingToModify({
      name,
      value: !entity.settings[name],
    });
  };

  const toggleEducationalStageSetting = () => {
    const value = isMiddleSchool
      ? EducationalSettingTypes.HIGH_SCHOOL
      : EducationalSettingTypes.MIDDLE_SCHOOL;

    setSettingToModify({
      name: 'assessmentType',
      value,
    });
  };

  const closeModal = () => setSettingToModify(null);

  const handleDateChange = (schoolYearStartDate: { month: number; day: number }) => {
    updateSchoolYearStartDate(entityUuid, { value: schoolYearStartDate });
  };

  const settings: SettingsCheckboxes[] = [
    {
      name: 'assessmentEnabled',
      'data-testid': 'assessment-switch',
      label: t('admin.entities.settings.assessmentEnabledLabel'),
      additionalLabel: t('admin.entities.settings.assessmentEnabledAdditionalLabel'),
      value: assessmentEnabled,
      onChange: toggleSetting,
      icon: AssessmentIcon,
    },
    {
      name: 'onboardingEnabled',
      'data-testid': 'onboarding-switch',
      label: t('admin.entities.settings.onboardingEnabled'),
      additionalLabel: t('admin.entities.settings.onboardingEnabledAdditionalLabel'),
      value: onboardingEnabled,

      onChange: toggleSetting,
      icon: OnboardingIcon,
    },
    {
      name: 'assessmentType',
      'data-testid': 'middleSchool-switch',
      label: t('admin.entities.settings.assessmentTypeEnabledLabel'),
      alwaysEnabled: true,
      additionalLabel: t('admin.entities.settings.assessmentTypeEnabledAdditionalLabel'),
      switchLabel: t('admin.entities.settings.highSchool'),
      switchAdditionalLabel: t('admin.entities.settings.middleSchool'),
      value: !isMiddleSchool,
      onChange: toggleEducationalStageSetting,
      icon: HighSchoolIcon,
    },
    {
      name: 'selfEvaluationEnabled',
      'data-testid': 'self-evaluation-switch',
      label: t('admin.entities.settings.selfEvaluationEnabledLabel'),
      value: selfEvaluationEnabled,
      additionalLabel: t('admin.entities.settings.selfEvaluationEnabledAdditionalLabel'),
      onChange: toggleSetting,
      icon: SelfEvaluationIcon,
    },
    {
      name: 'classManagementEnabled',
      'data-testid': 'class-management-switch',
      label: t('admin.entities.settings.classManagementEnabled'),
      additionalLabel: t('admin.entities.settings.enableClassManagementAdditionalLabel'),
      value: classManagementEnabled,
      onChange: toggleSetting,
      icon: ClassIcon,
    },
    {
      name: 'opportunitiesEnabled',
      'data-testid': 'opportunities-switch',
      label: t('admin.entities.settings.opportunitiesEnabled'),
      additionalLabel: t('admin.entities.settings.opportunitiesEnabledAdditionalLabel'),
      value: opportunitiesEnabled,
      onChange: toggleSetting,
      icon: OpportunitiesIcon,
    },
    {
      name: 'postSecondaryApplicationsEnabled',
      'data-testid': 'post-secondary-switch',
      label: t('admin.entities.settings.postSecondaryApplicationsEnabled'),
      additionalLabel: t('admin.entities.settings.postSecondaryApplicationsEnabledAdditionalLabel'),
      value: postSecondaryApplicationsEnabled,
      onChange: toggleSetting,
      icon: BuildingIcon,
    },
  ];

  return (
    <TabCard
      description={t('admin.entities.tabs.settingsDescription')}
      icon={SettingsIcon}
      title={t('admin.entities.tabs.settings')}>
      <div className='flex flex-col gap-sm'>
        {settings.map((setting) => (
          <ToggleSwitchTile
            key={setting.name}
            Icon={setting.icon}
            additionalSwitchLabel={setting.switchAdditionalLabel}
            data-testid={setting['data-testid']}
            description={setting.additionalLabel}
            isEnabled={setting.value}
            name={setting.name}
            switchLabel={setting.switchLabel}
            title={setting.label}
            onChange={setting.onChange as (event: ChangeEvent<HTMLInputElement>) => void}
          />
        ))}
        <SchoolYearDatePicker
          schoolYearStartDate={schoolYearStartDate}
          onChange={handleDateChange}
        />
        {settingToModify && (
          <SettingModal entity={entity} setting={settingToModify} onClose={closeModal} />
        )}
      </div>
    </TabCard>
  );
}

export default AdminEntitySettings;
