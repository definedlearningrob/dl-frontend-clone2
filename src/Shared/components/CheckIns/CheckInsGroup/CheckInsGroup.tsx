import CheckInQuestion from '@shared/components/CheckIns/CheckInQuestion/CheckInQuestion';
import { TCheckInGroup } from '@shared/components/CheckIns/types';

import styles from './CheckInsGroup.module.sass';

type Props = {
  checkInGroup: TCheckInGroup;
  startIndex: number;
};

const CheckInsGroup = ({ checkInGroup, startIndex }: Props) => {
  const { questions } = checkInGroup;

  const renderCheckInGroupQuestions = () =>
    questions.map((checkInQuestion, index) => {
      const questionIndex = index + startIndex;

      return (
        <CheckInQuestion
          key={checkInQuestion.id}
          checkInQuestion={checkInQuestion}
          questionIndex={questionIndex}
        />
      );
    });

  return (
    <div className={styles.groupWrapper}>
      <h5 className={styles.groupName}>{checkInGroup.displayName}</h5>
      {questions && renderCheckInGroupQuestions()}
    </div>
  );
};

export default CheckInsGroup;
