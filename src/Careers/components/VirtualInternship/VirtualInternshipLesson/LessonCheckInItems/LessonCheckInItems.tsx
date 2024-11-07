import { LessonItemCard } from '@dc/components/Student/Lesson/shared/LessonItemCard/LessonItemCard';

import { TCheckInGroup, TCheckInQuestion } from '../types';

import { LessonCheckInItem } from './LessonCheckInItem';

type Props = {
  checkInItems: (TCheckInGroup | TCheckInQuestion)[];
};

export const LessonCheckInItems = ({ checkInItems }: Props) => (
  <>
    {checkInItems.map((checkInItem) => (
      <LessonItemCard key={checkInItem.id} id={`${checkInItem.id}-${checkInItem.__typename}`}>
        <LessonCheckInItem checkInItem={checkInItem} />
      </LessonItemCard>
    ))}
  </>
);
