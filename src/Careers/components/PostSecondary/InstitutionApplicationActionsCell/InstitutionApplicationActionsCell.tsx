import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { match } from 'ts-pattern';

import { APPLICATIONS_TYPE, INSTITUTION_APPLICATION_STATUS } from '@dc/resources/enums';
import { InstitutionApplication } from '@dc/graphql/student/queries/institutionApplications';
import useUserInfo from '@dc/hooks/useUserInfo';
import { TStudentInfo } from '@dc/graphql/student/queries/userInfo';
import { useDeleteInstitutionApplication } from '@dc/graphql/student/hooks/useDeleteInstitutionApplication';
import {
  checkIfCanBeMovedToCommonApp,
  checkIfHasEnoughTeachers,
} from '@dc/components/PostSecondary/helpers';

import { ApplicationActionsDropdown } from '@shared/components/ApplicationActionsDropdown/ApplicationActionsDropdown';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { Tooltip } from '@shared/components/Tooltip';
import { ReactComponent as BuildingIcon } from '@shared/svg/building.svg';
import { ReactComponent as ArrowsRightLeftIcon } from '@shared/svg/arrowsRightLeft.svg';
import { ReactComponent as AddUserIcon } from '@shared/svg/add_user.svg';
import { ReactComponent as ArrowUpRightIcon } from '@shared/svg/ArrowUpRight.svg';
import { ReactComponent as DeleteIcon } from '@shared/svg/delete_outlined.svg';
import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';

type Props = {
  rowData: InstitutionApplication;
  onChooseTeacher: (application: InstitutionApplication) => void;
};

export const InstitutionApplicationActionsCell = ({ rowData, onChooseTeacher }: Props) => {
  const { t } = useTranslation();

  const {
    id,
    type,
    status,
    acceptsTeacherRecommendation,
    institution: { id: institutionId, commonAppApplicationUrl },
  } = rowData;

  const {
    userInfo: {
      commonAppData: { hasAccountConnected, hasCounselorInvited, hasFerpaSigned },
    },
  } = useUserInfo<TStudentInfo>();

  const [deleteInstitutionApplication] = useDeleteInstitutionApplication();

  const isDirectApplication = type === APPLICATIONS_TYPE.DIRECT;
  const isCommonAppApplication = type === APPLICATIONS_TYPE.COMMON_APP;
  const commonAppApplicationLink = commonAppApplicationUrl?.split('?')[0];

  const getDropdownItems = () => {
    const cannotChooseTeacher =
      isDirectApplication ||
      !hasCounselorInvited ||
      !acceptsTeacherRecommendation ||
      status === INSTITUTION_APPLICATION_STATUS.COMPLETED;

    return [
      {
        Icon: BuildingIcon,
        link: `/post-secondary/institutions/${institutionId}`,
        text: t('student.postSecondary.applicationsSection.showInstitution'),
      },
      {
        action: () => onChooseTeacher(rowData),
        hidden: cannotChooseTeacher,
        text: t('student.postSecondary.applicationsSection.chooseTeachers'),
        Icon: AddUserIcon,
      },
      {
        link: commonAppApplicationUrl,
        hidden: !checkIfCanBeMovedToCommonApp(rowData, hasAccountConnected),
        text: t('student.postSecondary.applicationsSection.changeToCommonApp'),
        Icon: ArrowsRightLeftIcon,
      },
      {
        hidden: !hasAccountConnected || !isCommonAppApplication,
        link: commonAppApplicationLink,
        text: t('student.postSecondary.applicationsSection.openCommonApp'),
        Icon: ArrowUpRightIcon,
      },
      {
        hidden: !isDirectApplication,
        action: () => deleteInstitutionApplication(id, institutionId),
        additionalClassName: 'text-danger-500',
        text: t('student.postSecondary.applicationsSection.removeApplication'),
        Icon: DeleteIcon,
      },
    ].filter((item) => !item?.hidden);
  };

  if (isCommonAppApplication && !acceptsTeacherRecommendation) {
    return (
      <div className='w-full flex justify-end'>
        <Tooltip
          className='invisible action'
          delayDuration={300}
          message={t('student.postSecondary.applicationsSection.showInstitution')}>
          <RouterLink to={`/post-secondary/institutions/${institutionId}`}>
            <IconContainer
              Icon={BuildingIcon}
              className='!bg-white rounded-xs !text-primary-500'
              paddingSize='xxs'
              size='base'
            />
          </RouterLink>
        </Tooltip>
      </div>
    );
  }

  const conditions = {
    status,
    hasFerpaSigned,
    hasCounselorInvited,
    acceptsTeacherRecommendation,
    isCommonAppApplication,
    isDirectApplication,
    hasAccountConnected,
    canBeMovedToCommonApp: checkIfCanBeMovedToCommonApp(rowData, hasAccountConnected),
    hasEnoughTeachers: checkIfHasEnoughTeachers(rowData),
  };

  const { tooltipMessageKey, showInfoIcon } = match(conditions)
    .with(
      {
        hasAccountConnected: true,
        canBeMovedToCommonApp: true,
      },
      () => ({
        showInfoIcon: true,
        tooltipMessageKey: 'student.postSecondary.applicationsSection.canBeMovedToCommonApp',
      })
    )
    .with(
      {
        status: INSTITUTION_APPLICATION_STATUS.COMPLETED,
        isCommonAppApplication: true,
        hasAccountConnected: true,
      },
      () => ({
        showInfoIcon: true,
        tooltipMessageKey: 'student.postSecondary.applicationsSection.readyToSend',
      })
    )
    .with(
      { hasFerpaSigned: false, isCommonAppApplication: true, hasAccountConnected: true },
      () => ({
        showInfoIcon: true,
        tooltipMessageKey: 'student.postSecondary.applicationsSection.applicationTooltipFerpa',
      })
    )
    .with(
      { hasCounselorInvited: false, isCommonAppApplication: true, hasAccountConnected: true },
      () => ({
        showInfoIcon: true,
        tooltipMessageKey: 'student.postSecondary.applicationsSection.applicationTooltipCounselor',
      })
    )
    .with(
      {
        acceptsTeacherRecommendation: true,
        hasAccountConnected: true,
        hasFerpaSigned: true,
        hasCounselorInvited: true,
        hasEnoughTeachers: false,
        isCommonAppApplication: true,
      },
      () => ({
        tooltipMessageKey: 'student.postSecondary.applicationsSection.chooseTeacherTooltip',
        showInfoIcon: true,
      })
    )
    .otherwise(() => ({
      tooltipMessageKey: '',
      showInfoIcon: false,
    }));

  return (
    <div className='flex gap-xs justify-end grow-1 w-full'>
      {showInfoIcon && (
        <div className='rounded-xs'>
          <Tooltip message={t(tooltipMessageKey)}>
            <IconContainer
              Icon={InfoIcon}
              className='!bg-info-100 rounded-xs !text-info-500'
              paddingSize='xxs'
              size='base'
            />
          </Tooltip>
        </div>
      )}
      <div className='invisible action' onClick={(event) => event.stopPropagation()}>
        <ApplicationActionsDropdown
          dataTestId='application-context-menu'
          items={getDropdownItems()}
        />
      </div>
    </div>
  );
};
