import { useTranslation } from 'react-i18next';
import { match } from 'ts-pattern';

import { ReactComponent as NotStartedIcon } from '@shared/svg/not_started_icon.svg';
import { ReactComponent as SubmittedIcon } from '@shared/svg/submitted_icon.svg';
import { ReactComponent as AcceptedIcon } from '@shared/svg/accepted_icon.svg';
import { ReactComponent as RejectedIcon } from '@shared/svg/rejected_icon.svg';
import { ReactComponent as DraftIcon } from '@shared/svg/file.svg';
import { Badge, BadgeSize, BadgeType } from '@shared/components/Badge/Badge';

import { SUBMISSION_STATUS } from './SubmissionStatus';

type StatusBadgeProps = {
  status: SUBMISSION_STATUS;
  statusLabel?: string;
  answersCount?: number;
  size?: BadgeSize;
};

const statusToIconMap = {
  [SUBMISSION_STATUS.NOT_STARTED]: NotStartedIcon,
  [SUBMISSION_STATUS.DRAFT]: DraftIcon,
  [SUBMISSION_STATUS.SUBMITTED]: SubmittedIcon,
  [SUBMISSION_STATUS.RE_SUBMITTED]: SubmittedIcon,
  [SUBMISSION_STATUS.UPDATED]: SubmittedIcon,
  [SUBMISSION_STATUS.ACCEPTED]: AcceptedIcon,
  [SUBMISSION_STATUS.GRADED]: AcceptedIcon,
  [SUBMISSION_STATUS.NOT_ACCEPTED]: RejectedIcon,
};

export const SubmissionStatusBadge = ({
  status,
  statusLabel,
  answersCount,
  size,
}: StatusBadgeProps) => {
  const { t } = useTranslation();

  const IconComponent = statusToIconMap[status];

  const statusText = statusLabel || t(`components.checkIns.statuses.${status}`);

  const badgeType = match(status)
    .returnType<BadgeType>()
    .with(SUBMISSION_STATUS.NOT_ACCEPTED, () => 'danger')
    .with(SUBMISSION_STATUS.ACCEPTED, SUBMISSION_STATUS.GRADED, () => 'success')
    .with(
      SUBMISSION_STATUS.SUBMITTED,
      SUBMISSION_STATUS.DRAFT,
      SUBMISSION_STATUS.RE_SUBMITTED,
      SUBMISSION_STATUS.UPDATED,
      () => 'secondary'
    )
    .with(SUBMISSION_STATUS.NOT_STARTED, () => 'neutral')
    .exhaustive();

  const text = answersCount
    ? `${statusText} - ${t('components.checkIns.submission', { count: answersCount })}`
    : statusText;

  return (
    <Badge
      Icon={IconComponent}
      className='whitespace-nowrap'
      size={size || 'base'}
      type={badgeType}>
      {text}
    </Badge>
  );
};
