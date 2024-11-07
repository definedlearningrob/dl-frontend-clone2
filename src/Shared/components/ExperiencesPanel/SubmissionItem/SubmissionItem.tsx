import { ServiceName } from '@shared/components/ExperiencesPanel/types';
import DeprecatedTooltip from '@shared/components/DeprecatedTooltip/DeprecatedTooltip';
import { formatDateTime, parseDate } from '@shared/utils/date/date';
import { Badge } from '@shared/components/Badge/Badge';
import { TSubmission } from '@shared/graphql/student/query/careerExperience';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { ReactComponent as TeamIcon } from '@shared/svg/projectTeam.svg';
import SharedIcon from '@shared/components/Icon/Icon';

import styles from './SubmissionItem.module.sass';

type Props = {
  submission: TSubmission;
};

const serviceLabelMap = {
  LEARNING: { label: 'Learning', abbreviation: 'DL' },
  CAREERS: { label: 'Careers', abbreviation: 'DC' },
};

export const SubmissionItem = ({ submission }: Props) => {
  const isDesktop = useBreakpointUp({ breakpoint: 'xxl' });
  const badgeLabelKey = isDesktop ? 'label' : 'abbreviation';
  const serviceKey = submission.service;
  const badgeLabel = serviceLabelMap[serviceKey][badgeLabelKey];
  const badgeType = submission.service === ServiceName.CAREERS ? 'danger' : 'info';

  return (
    <div className={styles.submissionItem}>
      <div className={styles.itemContent}>
        <p className={styles.submissionTitle}>
          {submission.isTeamSubmission && (
            <div className={styles.iconWrapper}>
              <SharedIcon className={styles.teamIcon} icon={<TeamIcon />} size='xs' />
            </div>
          )}
          {submission.submissionName}
        </p>
        <div className={styles.submissionDetails}>
          <span className={styles.submissionContextTitle}>{submission.contextName}</span>
          <span className={styles.dotSeparator} />
          <span className={styles.date}>
            <DeprecatedTooltip
              message={formatDateTime(submission.submittedAt, { withTime: true })}
              variant='dark'>
              {parseDate(submission.submittedAt)}
            </DeprecatedTooltip>
          </span>
        </div>
      </div>
      {badgeLabel && <Badge type={badgeType}>{badgeLabel}</Badge>}
    </div>
  );
};
