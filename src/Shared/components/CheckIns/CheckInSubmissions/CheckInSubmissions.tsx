import { useMemo } from 'react';

import type { TCheckInTeamSubmission } from '@pbl/components/Project/types';
import type { TCheckinTeamSubmission as TGradingCheckinTeamSubmission } from '@pbl/graphql/user/queries/checkinQuestionToGrade';

import { SubmissionList } from '@shared/components/Submissions';

import styles from './CheckInSubmissions.module.sass';

type Props = {
  submission: TCheckInTeamSubmission | TGradingCheckinTeamSubmission | null;
  userUuid: string;
};

export const CheckInSubmissions = ({ submission, userUuid }: Props) => {
  const answers = useMemo(() => {
    if (!submission) {
      return null;
    }

    return submission.answers.map(({ student, updatedAt, answer, id }) => ({
      id,
      content: answer,
      author: {
        uuid: student.uuid,
        name: `${student.firstName} ${student.lastName}`,
      },
      date: updatedAt,
    }));
  }, [submission]);

  if (!answers) {
    return null;
  }

  return (
    <div className={styles.container}>
      <SubmissionList className={styles.checkInContent} submissions={answers} userUuid={userUuid} />
    </div>
  );
};
