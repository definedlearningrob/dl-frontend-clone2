import { useTranslation } from 'react-i18next';

import { ReactComponent as AcceptedIcon } from '@shared/svg/checkmark_circle_outlined.svg';
import { ReactComponent as RejectedIcon } from '@shared/svg/clear_circle_outlined.svg';
import { ReactComponent as NotSubmittedIcon } from '@shared/svg/clear_circle_outlined.svg';
import { STUDENT_GRADING_STATUS, SUBMISSION_GRADE_STATUS } from '@shared/resources/enums';
import { Kicker } from '@shared/components/Kicker';
import { formatDateTime } from '@shared/utils/date';
import { Badge } from '@shared/components/Badge/Badge';

type Props = {
  gradedBy: string;
  status?: SUBMISSION_GRADE_STATUS;
  updatedAt?: string;
};

const iconMap = {
  [SUBMISSION_GRADE_STATUS.ACCEPTED]: AcceptedIcon,
  [SUBMISSION_GRADE_STATUS.NOT_ACCEPTED]: RejectedIcon,
  [STUDENT_GRADING_STATUS.NOT_STARTED]: NotSubmittedIcon,
} as const;

const typeMap = {
  [SUBMISSION_GRADE_STATUS.ACCEPTED]: 'success',
  [SUBMISSION_GRADE_STATUS.NOT_ACCEPTED]: 'danger',
  [STUDENT_GRADING_STATUS.NOT_STARTED]: 'neutral',
} as const;

const GradingStatus = ({ gradedBy, status, updatedAt }: Props) => {
  const { t } = useTranslation();

  const statusText = t(`user.grading.statuses.${status}`, {
    defaultValue: t('user.grading.notSubmitted'),
  });

  const castedStatus = status ? status : STUDENT_GRADING_STATUS.NOT_STARTED;

  return (
    <div>
      <Kicker>{t('user.grading.status')}</Kicker>
      <div className='flex gap-xs items-center text-xs'>
        <Badge Icon={iconMap[castedStatus]} type={typeMap[castedStatus]}>
          {statusText}
        </Badge>
        {status && (
          <span>
            {t('user.grading.statusBy', {
              name: gradedBy,
            })}
            {updatedAt &&
              t('user.grading.atDate', { date: formatDateTime(updatedAt, { withTime: true }) })}
          </span>
        )}
      </div>
    </div>
  );
};

export default GradingStatus;
