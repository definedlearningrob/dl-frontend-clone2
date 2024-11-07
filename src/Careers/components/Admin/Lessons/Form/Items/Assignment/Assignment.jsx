import { useTranslation } from 'react-i18next';

import AssignmentEdit from '@dc/components/Admin/Lessons/Form/Items/Assignment/Edit/Edit';
import AssignmentNew from '@dc/components/Admin/Lessons/Form/Items/Assignment/New/New';
import useLessonItems from '@dc/hooks/useLessonItems';
import { LessonItemDetailsModal } from '@dc/components/Admin/Lessons/Form/Items/LessonItemDetailsModal/LessonItemDetailsModal';

import { ReactComponent as AssignmentIcon } from '@shared/assets/icons/file_document.svg';
import { ListItem } from '@shared/components/SelectableList/ListItem/ListItem';

function AdminLessonsFormItemsAssignment() {
  const { t } = useTranslation();
  const { formVisible, editingLessonItem, filteredItems, previewItem, setPreviewItem, addItem } =
    useLessonItems();

  const renderProperForm = () =>
    editingLessonItem ? <AssignmentEdit assignment={editingLessonItem} /> : <AssignmentNew />;

  const closePreviewModal = () => setPreviewItem(null);

  const handleEditClick = (item) => {
    window.open(
      `/admin/lesson-items/assignment/${item.id}/edit?standaloneEdit=true`,
      '_blank',
      'noreferrer'
    );
  };

  if (formVisible) {
    return <div data-testid='assignments-section'>{renderProperForm()}</div>;
  }

  return (
    <div data-testid='assignments-section'>
      <ul className='lessons__items-list'>
        {!filteredItems.length ? (
          <span>{t('admin.lessons.items.emptyList')}</span>
        ) : (
          filteredItems.map((assignment) => (
            <ListItem
              key={assignment.id}
              Icon={AssignmentIcon}
              name={assignment.assetName}
              onChange={() => addItem(assignment)}
              onDetailsClick={() => setPreviewItem(assignment)}
              onEditClick={() => handleEditClick(assignment)}
            />
          ))
        )}
      </ul>
      {previewItem && (
        <LessonItemDetailsModal
          isOpen={!!previewItem}
          item={previewItem}
          onClose={closePreviewModal}
        />
      )}
    </div>
  );
}

export default AdminLessonsFormItemsAssignment;
