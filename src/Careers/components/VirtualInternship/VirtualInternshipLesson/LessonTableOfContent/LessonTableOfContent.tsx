import { useTranslation } from 'react-i18next';

import { LessonItemCard } from '@dc/components/Student/Lesson/shared/LessonItemCard/LessonItemCard';
import { LessonProgressList } from '@dc/components/Student/VirtualInternship/LessonProgressList';

import { LessonTableOfContentActions } from './LessonTableOfContentActions';

export const LessonTableOfContent = () => {
  const { t } = useTranslation();

  return (
    <LessonItemCard title={t('lessons.lessonItem.virtualInternshipContent')}>
      <LessonProgressList />
      <LessonTableOfContentActions />
    </LessonItemCard>
  );
};
