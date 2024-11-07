import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useField } from 'formik';

import { AvailableLessonsList } from '@dc/components/Admin/Courses/Form/Lessons/AvailableLessonsList/AvailableLessonsList';
import LessonDetailsModal from '@dc/components/Admin/Courses/Form/Lessons/Modal/Modal';
import { PaginationBar } from '@dc/components/Admin/Shared/List/PaginationBar/PaginationBar';
import SelectedLessonsList from '@dc/components/Admin/Courses/Form/Lessons/SelectedLessonsList/SelectedLessonsList';
import { LESSON_TYPES } from '@dc/resources/constants';
import { ReactComponent as LessonsIcon } from '@dc/svg/table_of_content.svg';
import { assignSteps } from '@dc/utils/assignSteps';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import Card from '@shared/components/Card/Card';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { ListWrapper } from '@shared/components/SelectableList/ListWrapper/ListWrapper';
import { Select } from '@shared/components/Select';
import { ErrorMessage } from '@shared/components/ErrorMessage/ErrorMessage';

AdminCoursesFormLessons.propTypes = {
  clearFilter: PropTypes.func,
  fieldName: PropTypes.string,
  label: PropTypes.string,
  lessonTypeOptions: PropTypes.array,
  pagingProps: PropTypes.object,
  SearchBar: PropTypes.func,
  selectedLessonType: PropTypes.object,
  selectLessonType: PropTypes.func,
};

function AdminCoursesFormLessons({
  clearFilter,
  fieldName,
  label,
  lessonTypeOptions,
  pagingProps,
  SearchBar,
  selectedLessonType,
  selectLessonType,
}) {
  const [activeLesson, setActiveLesson] = useState(null);
  const { t } = useTranslation();
  const [lessonsInput, lessonsMeta, lessonsHelpers] = useField(fieldName);
  const isDetailsModalOpen = activeLesson !== null;

  const closeDetailsModal = () => setActiveLesson(null);
  const openItemDetails = (lesson) => setActiveLesson(lesson);
  const sortedByStep = lessonsInput.value.slice().sort((a, b) => a.step - b.step);

  const moveSurveyToBottom = (newLessons) => {
    const indexOfSurveyLesson = newLessons.findIndex(
      ({ type }) => type.toUpperCase() === LESSON_TYPES.CAREER_REVIEW_SURVEY
    );
    newLessons.push(newLessons.splice(indexOfSurveyLesson, 1)[0]);

    return assignSteps(newLessons);
  };

  const addLesson = (lesson) => {
    const { value } = lessonsInput;
    lessonsHelpers.setValue(moveSurveyToBottom([...value, lesson]));
  };

  const removeLesson = (lesson) => {
    const newLessons = lessonsInput.value.filter(({ id }) => id !== lesson.id);
    lessonsHelpers.setValue(assignSteps(newLessons));
  };

  const handleEdit = (lesson) => {
    window.open(`/admin/lesson/${lesson.id}/edit`, '_blank', 'noreferrer');
  };

  return (
    <Card>
      <Card.Header>
        <div className='flex items-center gap-xs'>
          <IconContainer
            Icon={LessonsIcon}
            className='bg-neutral-200 rounded-xs'
            paddingSize='xs'
          />
          <h4 className='m-0'>{label || t('admin.courses.lessons.label')}</h4>
        </div>
      </Card.Header>
      <div className='flex gap-sm'>
        <ListWrapper
          actions={
            <div className='flex items-center gap-xs'>
              <SearchBar
                className='!w-[20px]'
                field='name'
                placeholder={t('common.placeholders.searchBy', {
                  field: t('common.fields.common.name').toLowerCase(),
                })}
              />
              {lessonTypeOptions && (
                <Select
                  className='w-[150px]'
                  options={lessonTypeOptions}
                  showError={false}
                  value={selectedLessonType}
                  onChange={selectLessonType(pagingProps.selectPage, clearFilter)}
                />
              )}
            </div>
          }
          title={t('admin.courses.lessons.allLessons')}>
          <div className='min-h-0 flex-1'>
            <SharedPaginatedLoader.Content {...pagingProps}>
              {({ lessons }) => (
                <AvailableLessonsList
                  fieldName={fieldName}
                  lessons={lessons.nodes}
                  onAdd={addLesson}
                  onDetailsOpen={openItemDetails}
                  onEditClick={handleEdit}
                />
              )}
            </SharedPaginatedLoader.Content>
          </div>
          <PaginationBar pagingProps={pagingProps} />
        </ListWrapper>

        <ListWrapper title={`${t('common.statuses.selected')} (${sortedByStep.length})`}>
          <SelectedLessonsList
            fieldName={fieldName}
            lessons={sortedByStep}
            onChange={removeLesson}
            onDetailsOpen={openItemDetails}
            onEditClick={handleEdit}
          />
        </ListWrapper>
        {isDetailsModalOpen && (
          <LessonDetailsModal
            isOpen={isDetailsModalOpen}
            lessonId={activeLesson?.id}
            onClose={closeDetailsModal}
          />
        )}
      </div>
      {lessonsMeta.error && (
        <div className='flex justify-end mt-sm'>
          <ErrorMessage errorMessage={lessonsMeta.error} />
        </div>
      )}
    </Card>
  );
}

export default AdminCoursesFormLessons;
