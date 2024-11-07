import { LessonItemCard } from '@dc/components/Student/Lesson/shared/LessonItemCard/LessonItemCard';
import type { TExternalPresentation } from '@dc/components/Student/Lesson/types';
import ExternalPresentation from '@dc/components/Student/Lesson/ExternalPresentation/ExternalPresentation';

type Props = {
  presentation: TExternalPresentation;
};

export const PresentationCard = ({ presentation }: Props) => {
  const { displayName, id, __typename } = presentation;
  const cardId = `${id}-${__typename}`;

  return (
    <LessonItemCard id={cardId} title={displayName}>
      <ExternalPresentation className='!mb-0' hideTitle={true} presentation={presentation} />
    </LessonItemCard>
  );
};
