import { TCheckInQuestion } from '@shared/components/CheckIns/types';

import styles from './CheckInQuestion.module.sass';

type Props = {
  checkInQuestion: TCheckInQuestion;
  questionIndex: number;
};

export const CheckInQuestionHeader = ({ checkInQuestion, questionIndex }: Props) => {
  const { question } = checkInQuestion;

  return (
    <div className={styles.questionWrapper}>
      <div className={styles.titleWrapper}>
        <span className={styles.questionStep}>{questionIndex}</span>
        <h6 className={styles.question}>{question}</h6>
      </div>
    </div>
  );
};
