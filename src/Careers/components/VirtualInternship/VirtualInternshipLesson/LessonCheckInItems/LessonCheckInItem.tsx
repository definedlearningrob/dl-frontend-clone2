import { TCheckInGroup, TCheckInQuestion } from '../types';

import { LessonCheckInGroup } from './LessonCheckInGroup';
import { LessonCheckInQuestion } from './LessonCheckInQuestion';

type Props = {
  checkInItem: TCheckInGroup | TCheckInQuestion;
};

export const LessonCheckInItem = ({ checkInItem }: Props) => {
  if (checkInItem.__typename === 'CheckInGroup') {
    return <LessonCheckInGroup checkInGroup={checkInItem} />;
  }

  return <LessonCheckInQuestion checkInQuestion={checkInItem} />;
};
