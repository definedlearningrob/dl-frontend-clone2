import { useMemo } from 'react';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { STUDENT_GRADING_STATUS, SUBMISSION_GRADE_STATUS } from '@shared/resources/enums';
import { TCheckInQuestion } from '@shared/components/CheckIns/types';

type Props = {
  allQuestions: TCheckInQuestion[];
};

export const TextStatus = ({ allQuestions }: Props) => {
  const { t } = useTranslation();
  const { teamId } = useParams<{ teamId?: string }>();

  const questionStatuses = allQuestions.map((question) => {
    const answer = !!teamId ? question.teamSubmission : question.answer;

    const status = useMemo(() => {
      const isGraded = !!answer?.grade;

      if (!answer) {
        return STUDENT_GRADING_STATUS.NOT_STARTED;
      }

      if (!isGraded) {
        return STUDENT_GRADING_STATUS.SUBMITTED;
      }

      const lastGradeDate = dayjs(answer.grade.updatedAt);

      const isTeamSubmission = 'answers' in answer;

      const lastAnswerDate = isTeamSubmission
        ? dayjs.max(answer.answers.map((answer) => dayjs(answer.updatedAt)))
        : dayjs(answer.updatedAt);

      if (lastGradeDate.isBefore(lastAnswerDate)) {
        return STUDENT_GRADING_STATUS.RE_SUBMITTED;
      }

      return answer.grade.status;
    }, [answer]);

    return status;
  });

  const acceptedQuestionsCount = questionStatuses.filter(
    (status) => status === SUBMISSION_GRADE_STATUS.ACCEPTED
  ).length;

  return (
    <span className='font-medium text-xxs whitespace-nowrap'>
      {t('components.checkIns.acceptedCount', {
        acceptedCount: acceptedQuestionsCount,
        totalCount: questionStatuses.length,
      })}
    </span>
  );
};
