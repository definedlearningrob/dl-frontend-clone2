import { useField } from 'formik';
import { useTranslation } from 'react-i18next';

import { TCourseLesson } from '@dc/graphql/user/queries/course';
import { getLessonLabel } from '@dc/utils/lessons';

import { ListItems } from '@shared/components/SelectableList/ListItems/ListItems';

type Props = {
  fieldName: string;
  lessons: TCourseLesson[];
  onDetailsOpen: (lesson: TCourseLesson) => void;
  onEditClick: (lesson: TCourseLesson) => void;
  onAdd: (lesson: TCourseLesson) => void;
};

export const AvailableLessonsList = ({
  fieldName,
  lessons,
  onDetailsOpen,
  onAdd,
  onEditClick,
}: Props) => {
  const { t } = useTranslation();
  const [lessonsInput] = useField<TCourseLesson[]>(fieldName);

  const addedLessonIds = lessonsInput.value.map(({ id }) => id);
  const filteredLessons = lessons.filter(({ id }) => !addedLessonIds.includes(id));

  const getKicker = (lesson: TCourseLesson) => ({
    text: getLessonLabel(t, lesson),
    variant: 'default' as const,
  });

  return (
    <ListItems
      getKicker={getKicker}
      isDraggable={false}
      items={filteredLessons}
      mode='add'
      onChange={onAdd}
      onDetailsOpen={onDetailsOpen}
      onEditClick={onEditClick}
    />
  );
};
