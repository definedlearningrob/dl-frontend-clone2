import { useCallback } from 'react';

import { TCheckInQuestion, TCheckInGroup } from '@pbl/components/Project/types';
import { useCheckIns } from '@pbl/components/Project/helpers/CheckInContext';
import { CheckInItem } from '@pbl/components/Project/CheckIns/CheckInItem';

import { CourseStatus } from '@shared/components/CheckIns/CourseStatus/CourseStatus';

import styles from './StudentCheckIns.module.sass';

const StudentCheckIns = () => {
  const { allCheckInItems, allQuestions } = useCheckIns();

  const getQuestionIndex = useCallback(
    (checkIn: TCheckInGroup | TCheckInQuestion) => {
      const checkInQuestion =
        checkIn.__typename === 'CheckInGroup' ? checkIn.questions[0] : checkIn;

      return allQuestions.findIndex((question) => question.id === checkInQuestion.id) + 1;
    },
    [allQuestions]
  );

  return (
    <div className={styles.checkInsWrapper}>
      <CourseStatus allQuestions={allQuestions} />
      {allCheckInItems.map((checkIn) => (
        <CheckInItem key={checkIn.id} checkIn={checkIn} questionIndex={getQuestionIndex(checkIn)} />
      ))}
    </div>
  );
};

export default StudentCheckIns;
