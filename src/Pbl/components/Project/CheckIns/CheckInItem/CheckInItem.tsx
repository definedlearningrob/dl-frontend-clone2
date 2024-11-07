import { TCheckInQuestion, TCheckInGroup } from '@pbl/components/Project/types';

import CheckInQuestion from '@shared/components/CheckIns/CheckInQuestion/CheckInQuestion';
import CheckInsGroup from '@shared/components/CheckIns/CheckInsGroup/CheckInsGroup';

type Props = {
  checkIn: TCheckInGroup | TCheckInQuestion;
  questionIndex: number;
};

export const CheckInItem = ({ checkIn, questionIndex }: Props) => {
  if (checkIn.__typename === 'CheckInQuestion') {
    return (
      <CheckInQuestion key={checkIn.id} checkInQuestion={checkIn} questionIndex={questionIndex} />
    );
  }

  return <CheckInsGroup key={checkIn.id} checkInGroup={checkIn} startIndex={questionIndex} />;
};
