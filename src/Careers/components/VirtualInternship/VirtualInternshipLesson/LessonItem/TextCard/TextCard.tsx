import { LessonItemCard } from '@dc/components/Student/Lesson/shared/LessonItemCard/LessonItemCard';
import { TText } from '@dc/components/Student/Lesson/types';

import { cleanInjection } from '@shared/utils/cleanInjection';

import styles from './TextCard.module.sass';

type Props = {
  text: TText;
};

export const TextCard = ({ text }: Props) => {
  const { id, displayName, content, __typename } = text;
  const cardId = `${id}-${__typename}`;

  return (
    <LessonItemCard key={id} id={cardId} title={displayName}>
      <p
        className={styles.textContent}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={cleanInjection(content)}
      />
    </LessonItemCard>
  );
};
