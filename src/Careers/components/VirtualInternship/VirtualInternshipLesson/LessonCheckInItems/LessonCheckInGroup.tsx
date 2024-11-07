import { TCheckInGroup } from '../types';

import { LessonCheckInQuestion } from './LessonCheckInQuestion';
import styles from './LessonCheckInItem.module.sass';

type Props = {
  checkInGroup: TCheckInGroup;
};

export const LessonCheckInGroup = ({ checkInGroup }: Props) => (
  <>
    <h5 className={styles.checkInItemName}>{checkInGroup.displayName}</h5>
    <div className={styles.questionsWrapper}>
      {checkInGroup.questions.map((question) => (
        <LessonCheckInQuestion key={question.id} checkInQuestion={question} />
      ))}
    </div>
  </>
);
