import { useTranslation } from 'react-i18next';

import { LessonItemCard } from '@dc/components/Student/Lesson/shared/LessonItemCard/LessonItemCard';
import { TVocabulary } from '@dc/components/Student/Lesson/types';

import { cleanInjection } from '@shared/utils/cleanInjection';

import styles from './VocabularyCard.module.sass';

type Props = {
  id: string;
  vocabularies: TVocabulary[];
};

export const VocabularyCard = ({ vocabularies, id }: Props) => {
  const { t } = useTranslation();
  const cardId = `${id}-Vocabulary`;

  return (
    <LessonItemCard id={cardId} title={t('lessons.lessonItem.vocabulary')}>
      <ul className={styles.vocabularyList}>
        {vocabularies.map((vocabulary) => (
          <li key={vocabulary.id} className={styles.vocabularyItem}>
            <strong>{vocabulary.term}</strong>
            <span> - </span>
            <span
              className={styles.vocabularyDefinition}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={cleanInjection(vocabulary.definition)}
            />
          </li>
        ))}
      </ul>
    </LessonItemCard>
  );
};
