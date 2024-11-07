import PropTypes from 'prop-types';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';

import { getLessonLabel } from '@dc/utils/lessons';
import { assignSteps } from '@dc/utils/assignSteps';

import { ListItems } from '@shared/components/SelectableList/ListItems/ListItems';

AdminCoursesFormLessonsSelectedLessonsList.propTypes = {
  fieldName: PropTypes.string,
  lessons: PropTypes.array,
  onChange: PropTypes.func,
  onDetailsOpen: PropTypes.func,
  onEditClick: PropTypes.func,
};

function AdminCoursesFormLessonsSelectedLessonsList({
  fieldName,
  lessons,
  onDetailsOpen,
  onEditClick,
  onChange,
}) {
  const [, , lessonsHelpers] = useField(fieldName);
  const { t } = useTranslation();

  const dragIsEnabled = (lesson) => lesson.type !== 'career_review_survey';

  const reorder = ({ source, destination }) => {
    const result = Array.from(lessons);
    const [removed] = result.splice(source.index, 1);
    result.splice(destination.index, 0, removed);

    return assignSteps(result);
  };

  const onDragEnd = (result) => {
    const hasReviewSurvey = lessons.find((lesson) => lesson.type === 'career_review_survey');
    if (
      !result.destination ||
      (hasReviewSurvey && result.destination.index === lessons.length - 1)
    ) {
      return;
    }

    const reordered = reorder(result);
    lessonsHelpers.setValue(reordered);
  };

  const getKicker = (lesson) => ({ text: getLessonLabel(t, lesson), variant: 'default' });

  return (
    <>
      <ListItems
        canDrag={dragIsEnabled}
        getKicker={getKicker}
        isDraggable={true}
        items={lessons}
        mode='remove'
        onChange={onChange}
        onDetailsOpen={onDetailsOpen}
        onDragEnd={onDragEnd}
        onEditClick={onEditClick}
      />
    </>
  );
}

export default AdminCoursesFormLessonsSelectedLessonsList;
