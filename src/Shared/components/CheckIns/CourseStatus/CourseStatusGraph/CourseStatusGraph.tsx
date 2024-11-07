import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import dayjs from 'dayjs';

import { useCheckIns } from '@pbl/components/Project/helpers/CheckInContext';
import { TCheckInTeamSubmission } from '@pbl/components/Project/types';

import SharedIcon from '@shared/components/Icon/Icon';
import DeprecatedTooltip from '@shared/components/DeprecatedTooltip/DeprecatedTooltip';
import { ReactComponent as AcceptedIcon } from '@shared/assets/icons/accepted_icon.svg';
import { ReactComponent as NotStartedIcon } from '@shared/assets/icons/not_started_icon.svg';
import { ReactComponent as RejectedIcon } from '@shared/assets/icons/rejected_icon.svg';
import { ReactComponent as SubmittedIcon } from '@shared/assets/icons/submitted_icon.svg';
import { STUDENT_GRADING_STATUS, SUBMISSION_GRADE_STATUS } from '@shared/resources/enums';

import { TCheckInQuestionAnswer } from '../../types';

import styles from './CourseStatusGraph.module.sass';

type Props = {
  answer: TCheckInQuestionAnswer | TCheckInTeamSubmission | null;
  index: number;
  questionId: string;
  questionsLength: number;
};

export const CourseStatusGraph = ({ answer, index, questionsLength }: Props) => {
  const { t } = useTranslation();
  const { handleScrollTo } = useCheckIns();

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

  const icon = useMemo(() => {
    const iconClasses = cx(styles.statusIcon, styles[status.toLowerCase()]);

    return {
      [STUDENT_GRADING_STATUS.NOT_STARTED]: (
        <SharedIcon className={iconClasses} icon={<NotStartedIcon />} size='xxs' />
      ),
      [STUDENT_GRADING_STATUS.SUBMITTED]: (
        <SharedIcon className={iconClasses} icon={<SubmittedIcon />} size='xxs' />
      ),
      [SUBMISSION_GRADE_STATUS.ACCEPTED]: (
        <SharedIcon className={iconClasses} icon={<AcceptedIcon />} size='xxs' />
      ),
      [SUBMISSION_GRADE_STATUS.NOT_ACCEPTED]: (
        <SharedIcon className={iconClasses} icon={<RejectedIcon />} size='xxs' />
      ),
      [STUDENT_GRADING_STATUS.RE_SUBMITTED]: (
        <SharedIcon className={iconClasses} icon={<SubmittedIcon />} size='xxs' />
      ),
    }[status];
  }, [answer, status]);

  return (
    <div className={styles.statusWrapper}>
      {icon}
      <DeprecatedTooltip
        className={styles.statusTooltip}
        message={t('components.checkIns.statusTooltipMessage', {
          status: t(`components.checkIns.statuses.${status}`).toLowerCase(),
        })}
        variant='dark'>
        <span className={styles.statusIndex} onClick={() => handleScrollTo(index)}>
          {++index}
        </span>
      </DeprecatedTooltip>
      {index < questionsLength && <span className={styles.statusDivider} />}
    </div>
  );
};
