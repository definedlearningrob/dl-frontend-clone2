import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';

import schoolClassWithStudentsQuery from '@dc/graphql/user/queries/schoolClassWithStudents';
import { TEACHER_DASHBOARD } from '@dc/graphql/user/queries/teacherDashboardClassesStats';
import updateSchoolClassSettingsMutation from '@dc/graphql/user/mutations/updateSchoolClassSettings';
import useUserInfo from '@dc/hooks/useUserInfo';
import { EducationalSettingTypes } from '@dc/resources/enums';
import { SchoolClassSettingsFormSection } from '@dc/components/User/SchoolClass/Header/Settings/Modal/SchoolClassSettingsFormSection';
import { ReactComponent as EducationalStageIcon } from '@dc/svg/educationalStage_icon.svg';

import SharedModal from '@shared/components/Modal/Modal';
import '@dc/components/User/SchoolClass/Header/Settings/Modal/Modal.sass';
import { Tooltip } from '@shared/components/Tooltip';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';

type Props = {
  settings: {
    assessmentType: string;
  };
  schoolClassName: string;
  schoolClassUuid: string;
  showModal: boolean;
  closeModal: () => void;
};

const UserSchoolClassHeaderSettingsModal = ({
  settings,
  schoolClassName,
  schoolClassUuid,
  showModal,
  closeModal,
}: Props) => {
  const { t } = useTranslation();
  const history = useHistory<any>();
  const { classUserUuid } = history.location?.state || {};
  const { userInfo } = useUserInfo();
  const userUuid = classUserUuid ?? userInfo?.uuid;
  const [updateSchoolClassSettings] = useMutation(updateSchoolClassSettingsMutation);
  const isMiddleSchool = settings.assessmentType === EducationalSettingTypes.MIDDLE_SCHOOL;

  const toggleEducationalSetting = async () => {
    const value = isMiddleSchool
      ? EducationalSettingTypes.HIGH_SCHOOL
      : EducationalSettingTypes.MIDDLE_SCHOOL;

    const settingsPayload = {
      assessmentType: value,
    };

    try {
      await updateSchoolClassSettings({
        variables: {
          input: {
            uuid: schoolClassUuid,
            settings: settingsPayload,
          },
        },
        refetchQueries: [
          { query: TEACHER_DASHBOARD, variables: { userUuid } },
          { query: schoolClassWithStudentsQuery, variables: { uuid: schoolClassUuid } },
        ],
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('error', error);
    }
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

  return (
    <SharedModal data-testid='user-school-class-modal' isOpen={showModal} onDismiss={closeModal}>
      <SharedModal.Header className='!px-base !pt-base !pb-0'>
        <SharedModal.Heading>
          {schoolClassName} {t('user.class.settings.modalHeader')}
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body className='!my-sm !px-base'>
        <SchoolClassSettingsFormSection
          Icon={EducationalStageIcon}
          additionalSwitchLabel={t('admin.entities.settings.middleSchool')}
          alwaysEnabled={true}
          isEnabled={!isMiddleSchool}
          name='assessmentType'
          switchLabel={t('admin.entities.settings.highSchool')}
          onChange={toggleEducationalSetting}>
          <div>
            <h6 className='flex items-center gap-xs mb-xxs text-xs font-bold leading-base'>
              {t('entityInfo.settings.educationalStage')}
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
              {t('entityInfo.settings.educationalStageInfo', {
                resource: t('entityInfo.settings.class'),
              })}
            </span>
          </div>
        </SchoolClassSettingsFormSection>
      </SharedModal.Body>
      <SharedModal.Footer className='!px-base'>
        <SharedModal.Button
          data-testid='save-settings-button'
          size='md'
          variant='primary-outlined'
          onClick={closeModal}>
          {t('common.actions.cancel')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};

export default UserSchoolClassHeaderSettingsModal;
