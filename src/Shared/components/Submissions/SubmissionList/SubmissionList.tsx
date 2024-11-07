import { Submission } from '@shared/components/Submissions';

import { SubmissionContent } from '../helpers/types';

import styles from './SubmissionList.module.sass';

type Props = {
  className?: string;
  fullWidth?: boolean;
  hideAvatars?: boolean;
  submissions: SubmissionContent[];
  userUuid?: string;
  variant?: 'default' | 'light';
};

export const SubmissionList = ({
  className,
  fullWidth,
  hideAvatars,
  submissions,
  userUuid,
  variant,
}: Props) => (
  <div className={styles.submissionList}>
    {submissions.map((submissionItem, index) => {
      const isLastElement = index === submissions.length - 1;
      const isCurrentUserItem = submissionItem.author.uuid === userUuid;

      return (
        <Submission
          key={submissionItem.id}
          className={className}
          content={submissionItem}
          fullWidth={fullWidth}
          hideAvatar={hideAvatars}
          hideIndicator={isLastElement}
          isCurrentUserItem={isCurrentUserItem}
          variant={variant}
        />
      );
    })}
  </div>
);
