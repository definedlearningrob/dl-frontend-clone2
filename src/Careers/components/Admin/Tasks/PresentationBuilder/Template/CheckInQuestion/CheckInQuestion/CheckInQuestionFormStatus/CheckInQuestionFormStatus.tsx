import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import { TCheckInTeamSubmission } from '@pbl/components/Project/types';

import { createTeacherName } from '@shared/components/CheckIns/helpers/createTeacherName';
import { TCheckInQuestionAnswer } from '@shared/components/CheckIns/types';
import { SubmissionStatusBadge } from '@shared/components/SubmissionStatusBadge';
import { SUBMISSION_STATUS } from '@shared/components/SubmissionStatusBadge';

type Props = {
  answer: TCheckInQuestionAnswer | TCheckInTeamSubmission | null;
  showAnswersCount?: boolean;
};

export const CheckInQuestionFormStatus = ({ answer, showAnswersCount }: Props) => {
  const { t } = useTranslation();
  const hasGrade = Boolean(answer?.grade);

  const isTeamSubmission = answer && 'answers' in answer;

  const status = useMemo(() => {
    const isGraded = !!answer?.grade;

    if (!answer) {
      return SUBMISSION_STATUS.NOT_STARTED;
    }

    if (!isGraded) {
      return SUBMISSION_STATUS.SUBMITTED;
    }

    const lastGradeDate = dayjs(answer.grade.updatedAt);

    const lastAnswerDate = isTeamSubmission
      ? dayjs.max(answer.answers.map((answer) => dayjs(answer.updatedAt)))
      : dayjs(answer.updatedAt);

    if (lastGradeDate.isBefore(lastAnswerDate)) {
      return SUBMISSION_STATUS.RE_SUBMITTED;
    }

    return SUBMISSION_STATUS[answer.grade.status];
  }, [answer]);

  const shouldRenderTeacher = () =>
    hasGrade &&
    status !== SUBMISSION_STATUS.RE_SUBMITTED && (
      <span className='text-xxxs text-right whitespace-nowrap'>
        {' '}
        {t('components.checkIns.byTeacherName', {
          teacherName: createTeacherName(answer),
        })}
      </span>
    );

  return (
    <div className='flex flex-col gap-xxxs'>
      <div className='w-min'>
        <SubmissionStatusBadge
          size='small'
          {...(showAnswersCount && isTeamSubmission && { answersCount: answer.answers.length })}
          status={status}
        />
      </div>
      {shouldRenderTeacher()}
    </div>
  );
};
