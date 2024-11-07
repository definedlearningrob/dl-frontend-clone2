import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import { isEmpty } from 'lodash-es';
import { useParams } from 'react-router-dom';

import { COMMON_APP_FORM_STATUS } from '@dc/resources/enums';
import { COMMON_APP_FORM_TYPES } from '@dc/screens/UserApp/CommonApp/CommonAppRequests/types';
import { useCommonAppFormStatuses } from '@dc/hooks/useCommonAppFormStatuses';

import { Badge } from '@shared/components/Badge/Badge';
import { ReactComponent as CircleIcon } from '@shared/assets/icons/not_started_icon.svg';
import { ReactComponent as AcceptedIcon } from '@shared/assets/icons/checkmark_circle_outlined.svg';
import { ReactComponent as InProgressIcon } from '@shared/assets/icons/submitted_icon.svg';
import { ReactComponent as CompletedIcon } from '@shared/assets/icons/checkmark_circle_outlined.svg';
import { ReactComponent as LockedIcon } from '@shared/svg/padlock.svg';
import { Tooltip } from '@shared/components/Tooltip';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

import { MEMBER_SPECIFIC_FORMS } from '../helpers';

type Props = {
  status: COMMON_APP_FORM_STATUS;
  formType: COMMON_APP_FORM_TYPES;
  isLocked: boolean;
  tooltipMessage?: string;
};

export const StatusBadge = ({ status, formType, isLocked, tooltipMessage }: Props) => {
  const { t } = useTranslation();
  const { studentUuid } = useParams<{ studentUuid: string }>();
  const { getFormsByStatusCount } = useCommonAppFormStatuses({ studentUuid });

  const isMemberSpecificForm = MEMBER_SPECIFIC_FORMS.includes(formType);
  const submittedLabel = t(
    'user.postSecondary.commonAppRequests.applicationFormList.formValues.submitted'
  );
  const { total, submitted } = getFormsByStatusCount(formType, COMMON_APP_FORM_STATUS.SUBMITTED);
  const hasAllInstitutionsSubmitted = submitted === total;

  const statusMap = {
    [COMMON_APP_FORM_STATUS.IN_PROGRESS]: {
      label: t('user.postSecondary.commonAppRequests.applicationFormList.formValues.inProgress'),
      Icon: InProgressIcon,
      tooltipMessage: '',
      badgeType: 'secondary',
      className: 'text-secondary-500',
    },
    [COMMON_APP_FORM_STATUS.NOT_STARTED]: {
      label: t('user.postSecondary.commonAppRequests.applicationFormList.formValues.notStarted'),
      Icon: CircleIcon,
      tooltipMessage: '',
      badgeType: 'neutral',
      className: 'text-font-secondary',
    },
    [COMMON_APP_FORM_STATUS.SUBMITTED]: {
      label: isMemberSpecificForm ? `${submittedLabel} ${submitted}/${total}` : submittedLabel,
      Icon: hasAllInstitutionsSubmitted ? CompletedIcon : CircleIcon,
      tooltipMessage: t(
        'user.postSecondary.commonAppRequests.applicationFormList.tooltipSubmittedMessage'
      ),
      badgeType: 'success',
      className: 'text-success-500',
    },
    [COMMON_APP_FORM_STATUS.DOWNLOADED]: {
      label: t('user.postSecondary.commonAppRequests.applicationFormList.formValues.submitted'),
      Icon: CompletedIcon,
      tooltipMessage: t(
        'user.postSecondary.commonAppRequests.applicationFormList.tooltipDownloadedMessage'
      ),
      badgeType: 'success',
      className: 'text-success-500',
    },
    [COMMON_APP_FORM_STATUS.COMPLETED]: {
      label: t('user.postSecondary.commonAppRequests.applicationFormList.formValues.readyToSend'),
      Icon: AcceptedIcon,
      tooltipMessage: '',
      badgeType: 'primary',
      className: 'text-primary-500',
    },
  } as const;

  const lockedStatus = {
    label: t('user.postSecondary.commonAppRequests.locked'),
    Icon: LockedIcon,
    tooltipMessage: tooltipMessage || '',
    badgeType: 'neutral',
    className: 'text-font-secondary',
  } as const;

  const statusProperties = isLocked ? lockedStatus : statusMap[status];

  const StatusIcon = statusProperties.Icon;
  const statusClassName = cx('flex gap-xxs items-center', statusProperties.className);

  return (
    <Badge type={statusProperties.badgeType}>
      <Tooltip
        disabled={isEmpty(statusProperties.tooltipMessage)}
        message={tooltipMessage ?? statusProperties.tooltipMessage}>
        <div className={statusClassName}>
          <IconContainer Icon={StatusIcon} paddingSize='none' size='sm' />
          <span>{statusProperties.label}</span>
        </div>
      </Tooltip>
    </Badge>
  );
};
