import { useTranslation } from 'react-i18next';
import { MouseEvent, useMemo } from 'react';

import { Student } from '@dc/graphql/user/queries/studentManagement';
import { useTogglePostSecondaryApplicationsForStudents } from '@dc/graphql/user/hooks/useTogglePostSecondaryApplicationsForStudent';
import { useResetPostSecondaryApplicationsForStudent } from '@dc/graphql/user/hooks/useResetPostSecondaryApplicationsForStudent';
import { useAssignStudentsToCounselor } from '@dc/graphql/user/hooks/useAssignStudentsToCounselor';
import useUserInfo from '@dc/hooks/useUserInfo';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';

import { ApplicationActionsDropdown } from '@shared/components/ApplicationActionsDropdown/ApplicationActionsDropdown';
import SharedSwitch from '@shared/components/Switch/Switch';
import { Tooltip } from '@shared/components/Tooltip';
import { ReactComponent as RefreshIcon } from '@shared/svg/settings_refresh.svg';
import { ReactComponent as GoalPerformanceIcon } from '@shared/assets/icons/bar_graph.svg';
import { ReactComponent as ArrowForwardIcon } from '@shared/assets/icons/assign_to_me.svg';
import { callToast } from '@shared/components/Toaster/Toaster';
import { IconButton } from '@shared/components/IconButton/IconButton';

type Props = {
  student: Student;
};

export const StudentActions = ({ student }: Props) => {
  const { t } = useTranslation();
  const { userInfo } = useUserInfo<TUserInfo>();
  const { togglePostSecondaryApplicationsForStudents } =
    useTogglePostSecondaryApplicationsForStudents();
  const { resetPostSecondaryApplicationsForStudent, isLoading: isResetApplicationsLoading } =
    useResetPostSecondaryApplicationsForStudent();
  const { assignStudentsToCounselor } = useAssignStudentsToCounselor();
  const { canPostSecondarySettingBeChanged, postSecondaryApplicationsStatus } = student;
  const { isOverridden, isEnabled } = postSecondaryApplicationsStatus;
  const isCounselor = userInfo.permissions.counselor;
  const handleToggleSwitch = () => {
    togglePostSecondaryApplicationsForStudents([student.uuid], !isEnabled);
  };
  const handleAssignStudentToCounselor = async (studentUuid: string) => {
    await assignStudentsToCounselor([studentUuid]);
    callToast('success', t('user.postSecondary.assignedStudents', { count: 1 }));
  };

  const handleResetApplications = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    await resetPostSecondaryApplicationsForStudent(student.uuid);

    callToast('success', t('user.postSecondary.resetApplicationsSuccess'));
  };

  const tooltipMessage = useMemo(() => {
    if (isOverridden) {
      return isEnabled
        ? t('user.postSecondary.applicationsEnabledPerStudent')
        : t('user.postSecondary.applicationsDisabledPerStudent');
    }

    return isEnabled
      ? t('user.postSecondary.applicationsEnabledByGradYear')
      : t('user.postSecondary.applicationsDisabledByGradYear');
  }, [postSecondaryApplicationsStatus]);

  if (!canPostSecondarySettingBeChanged) {
    return null;
  }

  const contextMenuOptions = [
    {
      Icon: GoalPerformanceIcon,
      text: t('user.goals.goalsProgressReport'),
      link: `/reports/student-progress/${student.plans?.[0]?.id}/${student.uuid}`,
      hidden: student.plans.length === 0,
    },
    {
      Icon: ArrowForwardIcon,
      text: t('user.assignToMe'),
      action: () => handleAssignStudentToCounselor(student.uuid),
      hidden: !isCounselor || student.counselor?.uuid === userInfo.uuid,
    },
  ].filter((option) => !option.hidden);

  return (
    <div className='flex items-center gap-xxs'>
      <Tooltip className='w-fit' message={tooltipMessage}>
        <SharedSwitch
          value={postSecondaryApplicationsStatus.isEnabled}
          onChange={handleToggleSwitch}
          onClick={(event) => event.stopPropagation()}
        />
      </Tooltip>
      {isOverridden && (
        <Tooltip className='w-fit' message={t('user.postSecondary.resetToDefault')}>
          <IconButton
            Icon={RefreshIcon}
            aria-label={t('user.postSecondary.resetToDefault')}
            className='text-primary-500'
            disabled={isResetApplicationsLoading}
            size='sm'
            variant='white'
            onClick={handleResetApplications}
          />
        </Tooltip>
      )}
      <div
        className='ml-auto invisible group-hover/row:visible'
        onClick={(event) => event.stopPropagation()}>
        {contextMenuOptions.length > 0 && <ApplicationActionsDropdown items={contextMenuOptions} />}
      </div>
    </div>
  );
};
