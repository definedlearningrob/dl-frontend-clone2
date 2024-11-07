import cx from 'classnames';
import { ChangeEvent } from 'react';
import { useTranslation, Trans } from 'react-i18next';

import { EducationalSettingTypes } from '@dc/resources/enums';
import { TSettings } from '@dc/graphql/user/queries/student';
import '@dc/components/User/Student/Settings/Modal/Modal.sass';
import { StudentSettingsFormSection } from '@dc/components/User/Student/Settings/Modal/StudentSettingsFormSection';
import { ReactComponent as ReportIcon } from '@dc/assets/icons/generate-report.svg';
import { ReactComponent as EducationalStageIcon } from '@dc/svg/educationalStage_icon.svg';

import SharedModal from '@shared/components/Modal/Modal';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { Tooltip } from '@shared/components/Tooltip';
import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';
import { ReactComponent as TeamIcon } from '@shared/assets/icons/projectTeam.svg';

type TSettingNames =
  | 'assessmentEnabled'
  | 'assessmentType'
  | 'onboardingEnabled'
  | 'selfEvaluationEnabled';

type Props = {
  studentName: string;
  settings: TSettings;
  onClose: () => void;
  handleSetSettingToModify: (data: {
    name: TSettingNames | string;
    value: boolean | string;
  }) => void;
};

const UserStudentSettingsModal = ({
  studentName,
  settings,
  onClose,
  handleSetSettingToModify,
}: Props) => {
  const { t } = useTranslation();
  const { assessmentEnabled, assessmentType, onboardingEnabled, selfEvaluationEnabled } = settings;
  const isMiddleSchool = assessmentType.value === EducationalSettingTypes.MIDDLE_SCHOOL;
  const userStudentSettingsClasses = (value: boolean) =>
    cx('user-student-settings__section', {
      '-active': value,
    });

  const toggleSetting = ({
    target: { name },
  }: ChangeEvent & { target: { name: TSettingNames } }) => {
    handleSetSettingToModify({
      name,
      value: !settings[name].value,
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

  return (
    <SharedModal data-testid='user-student-settings-modal' isOpen={true} onDismiss={onModalClose}>
      <SharedModal.Header className='!px-base !pt-base !pb-0'>
        <SharedModal.Heading>
          {studentName} {t('user.student.settings.modalHeader')}
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body className='!my-sm !px-base'>
        <StudentSettingsFormSection
          Icon={ReportIcon}
          activeBackground={userStudentSettingsClasses(assessmentEnabled.value)}
          isEnabled={assessmentEnabled.value}
          name='assessmentEnabled'
          onChange={toggleSetting as (event: ChangeEvent<HTMLInputElement>) => void}>
          <div>
            <h6 className='flex items-center gap-xs mb-xxs text-xs font-bold leading-base'>
              {t('user.student.settings.assessment')}
              <Tooltip message={t('entityInfo.settings.assessmentTooltipInfo')}>
                <IconContainer
                  Icon={InfoIcon}
                  className='text-primary-500'
                  paddingSize='none'
                  size='sm'
                />
              </Tooltip>
            </h6>
            <span className='text-xs font-regular leading-lg'>
              {t('user.student.settings.assessmentInfo')}
            </span>
          </div>
        </StudentSettingsFormSection>
        <StudentSettingsFormSection
          Icon={InfoIcon}
          activeBackground={userStudentSettingsClasses(onboardingEnabled.value)}
          isEnabled={onboardingEnabled.value}
          name='onboardingEnabled'
          onChange={toggleSetting as (event: ChangeEvent<HTMLInputElement>) => void}>
          <div>
            <h6 className='flex items-center gap-xs mb-xxs text-xs font-bold leading-base'>
              {t('user.entity.settings.onboarding')}

              <Tooltip message={t('user.student.settings.onboardingTooltipInfo')}>
                <IconContainer
                  Icon={InfoIcon}
                  className='text-primary-500'
                  paddingSize='none'
                  size='sm'
                />
              </Tooltip>
            </h6>
            <span className='text-xs font-regular leading-lg'>
              {t('user.student.settings.onboardingInfo')}
            </span>
          </div>
        </StudentSettingsFormSection>
        <StudentSettingsFormSection
          Icon={EducationalStageIcon}
          activeBackground={userStudentSettingsClasses(!isMiddleSchool)}
          additionalSwitchLabel={t('admin.entities.settings.middleSchool')}
          alwaysEnabled={true}
          isEnabled={!isMiddleSchool}
          name='assessmentType'
          switchLabel={t('user.student.settings.highSchoolLabel')}
          onChange={toggleEducationalSetting}>
          <div>
            <h6 className='flex items-center gap-xs mb-xxs text-xs font-bold leading-base'>
              {t('user.student.settings.educationalStage')}
              <Tooltip message={assessmentGradeTooltipContent}>
                <IconContainer
                  Icon={InfoIcon}
                  className='text-primary-500'
                  paddingSize='none'
                  size='sm'
                />
              </Tooltip>
            </h6>
            <span className='text-xs font-regular leading-lg'>
              {t('user.student.settings.educationalStageInfo')}
            </span>
            <div />
          </div>
        </StudentSettingsFormSection>
        <StudentSettingsFormSection
          Icon={TeamIcon}
          activeBackground={userStudentSettingsClasses(selfEvaluationEnabled.value)}
          isEnabled={selfEvaluationEnabled.value}
          name='selfEvaluationEnabled'
          onChange={toggleSetting as (event: ChangeEvent<HTMLInputElement>) => void}>
          <div>
            <h6 className='flex items-center gap-xs mb-xxs text-xs font-bold leading-base'>
              {t('user.student.settings.selfEvaluation')}
            </h6>
            <span className='text-xs font-regular leading-lg'>
              {t('user.student.settings.selfEvaluationInfo')}
            </span>
          </div>
        </StudentSettingsFormSection>
      </SharedModal.Body>
      <SharedModal.Footer className='!px-base'>
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

export default UserStudentSettingsModal;
