import { useEffect, useMemo, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import SharedRoleGuard from '@dc/shared/RoleGuard/RoleGuard';
import UserStudentSettingsModal from '@dc/components/User/Student/Settings/Modal/Modal';
import updateStudentSettingsMutation from '@dc/graphql/user/mutations/updateStudentSettings';
import { TStudent } from '@dc/graphql/user/mutations/updateStudentSettings';

import { ReactComponent as Settings } from '@shared/svg/settings_outlined.svg';
import SharedButton from '@shared/components/Button/Button';
import { ReactComponent as ArrowIcon } from '@shared/svg/arrow_forward.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

type TSettingNames =
  | 'assessmentEnabled'
  | 'assessmentType'
  | 'onboardingEnabled'
  | 'selfEvaluationEnabled';

type Props = {
  student: TStudent;
};

const linkClassName = cx(
  '!px-sm w-full !justify-between !text-primary-500',
  'hover:bg-primary-200 hover:!no-underline',
  '!rounded-none group'
);

const contentClassName = 'w-full !justify-start !gap-base text-primary-500';

const UserStudentSettings = ({ student }: Props) => {
  const { t } = useTranslation();
  const { firstName, lastName, settings, uuid } = student;
  const [showStudentSettingsModal, setShowStudentSettingsModal] = useState<boolean>(false);
  const [settingToModify, setSettingToModify] = useState<{
    name: TSettingNames | string;
    value: boolean | string;
  }>({
    name: '',
    value: '',
  });
  const [updateStudentSettings] = useMutation(updateStudentSettingsMutation);

  const toggleStudentSettingsModal = () => setShowStudentSettingsModal(!showStudentSettingsModal);

  const handleSetSettingToModify = (data: {
    name: TSettingNames | string;
    value: boolean | string;
  }) => {
    setSettingToModify(data);
  };

  const saveSetting = async () => {
    const userDataCacheId = {
      uuid,
      __typename: 'User',
    };

    try {
      await updateStudentSettings({
        variables: {
          input: {
            uuid,
            settings: settingsPayload,
          },
        },
        update(cache) {
          cache.modify({
            id: cache.identify(userDataCacheId),
            fields: {
              settings(cachedSettings) {
                return { ...cachedSettings, ...settingsPayload };
              },
            },
          });
        },
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('error', error);
    }
  };

  const isAssessmentRelatedSetting = useMemo(
    () => ['onboardingEnabled', 'assessmentEnabled'].includes(settingToModify.name),
    [settingToModify]
  );

  const assessmentRelatedSettings = useMemo(() => {
    const { assessmentEnabled, onboardingEnabled } = settings;
    const isTurningOnboardingOn =
      settingToModify.name === 'onboardingEnabled' && settingToModify.value;
    const isTurningAssessmentOff =
      settingToModify.name === 'assessmentEnabled' && !settingToModify.value;
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
      [settingToModify.name]: settingToModify.value,
    };
  }, [settings, settingToModify]);

  const settingsPayload = useMemo(
    () =>
      isAssessmentRelatedSetting
        ? assessmentRelatedSettings
        : {
            [settingToModify.name]: settingToModify.value,
          },
    [isAssessmentRelatedSetting, assessmentRelatedSettings, settingToModify]
  );

  useEffect(() => {
    settingToModify.name.length !== 0 && saveSetting();
  }, [settingToModify]);

  return (
    <>
      <SharedRoleGuard.Teacher>
        <SharedButton
          Icon={ArrowIcon}
          className={linkClassName}
          contentClassName={contentClassName}
          iconPlacement='end'
          onClick={toggleStudentSettingsModal}>
          <IconContainer
            Icon={Settings}
            className='bg-primary-200 text-primary-500 group-hover:bg-white'
          />
          {t('user.student.info.studentSettings')}
        </SharedButton>
      </SharedRoleGuard.Teacher>
      {showStudentSettingsModal && (
        <UserStudentSettingsModal
          handleSetSettingToModify={handleSetSettingToModify}
          settings={settings}
          studentName={`${firstName} ${lastName}`}
          onClose={toggleStudentSettingsModal}
        />
      )}
    </>
  );
};

export default UserStudentSettings;
