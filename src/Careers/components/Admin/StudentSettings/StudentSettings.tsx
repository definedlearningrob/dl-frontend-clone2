import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { EducationalSettingTypes } from '@dc/resources/enums';
import { TStudent } from '@dc/graphql/user/queries/student';

import SharedSwitch from '@shared/components/Switch/Switch';

import SettingsModal from './Modal/Modal';
import './Student.sass';

type Props = {
  student: TStudent;
};

type TSettingNames =
  | 'assessmentEnabled'
  | 'assessmentType'
  | 'onboardingEnabled'
  | 'selfEvaluationEnabled';

function AdminStudentSettings({ student }: Props) {
  const [settingToModify, setSettingToModify] = useState<{
    name: TSettingNames;
    value: boolean | string;
  } | null>(null);
  const { t } = useTranslation();
  const { assessmentEnabled, onboardingEnabled, assessmentType, selfEvaluationEnabled } =
    student.settings;
  const isMiddleSchool = assessmentType.value === EducationalSettingTypes.MIDDLE_SCHOOL;
  const toggleSetting = ({
    target: { name },
  }: ChangeEvent & { target: { name: TSettingNames } }) => {
    setSettingToModify({
      name,
      value: !student.settings[name].value,
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

  return (
    <section className='admin-student'>
      <h1 className='admin-student__heading' data-testid='student-name'>
        {student.firstName} {student.lastName}
      </h1>
      <p className='admin-student__sub-heading' data-testid='student-entity-name'>
        {student.entity.name}
      </p>
      <div className='admin-student__settings'>
        <h2 className='admin-student__category-heading'>{t('admin.student.settings.label')}</h2>
        <SharedSwitch
          className='admin-student__switch'
          data-testid='assessment-switch'
          label={t('admin.student.settings.assessmentEnabled', {
            origin: `(${assessmentEnabled.origin.toLowerCase()})`,
          })}
          name='assessmentEnabled'
          value={assessmentEnabled.value}
          onChange={toggleSetting as (event: ChangeEvent<HTMLInputElement>) => void}
        />
        <SharedSwitch
          className='admin-student__switch'
          data-testid='onboarding-switch'
          label={t('admin.student.settings.onboardingEnabled', {
            origin: `(${onboardingEnabled.origin.toLowerCase()})`,
          })}
          name='onboardingEnabled'
          value={onboardingEnabled.value}
          onChange={toggleSetting as (event: ChangeEvent<HTMLInputElement>) => void}
        />
        <SharedSwitch
          additionalLabel={t('admin.student.settings.middleSchool', {
            origin: `(${assessmentType.origin.toLowerCase()})`,
          })}
          alwaysEnabled={true}
          className='admin-student__switch'
          data-testid='middleSchool-switch'
          label={t('admin.student.settings.highSchool')}
          name='assessmentType'
          value={!isMiddleSchool}
          onChange={toggleEducationalStageSetting}
        />
        <SharedSwitch
          className='admin-student__switch'
          data-testid='self-evaluation-switch'
          label={t('admin.student.settings.selfEvaluationEnabled', {
            origin: `(${selfEvaluationEnabled.origin.toLowerCase()})`,
          })}
          name='selfEvaluationEnabled'
          value={selfEvaluationEnabled.value}
          onChange={toggleSetting as (event: ChangeEvent<HTMLInputElement>) => void}
        />
      </div>
      {settingToModify && (
        <SettingsModal setting={settingToModify} student={student} onClose={closeModal} />
      )}
    </section>
  );
}

export default AdminStudentSettings;
