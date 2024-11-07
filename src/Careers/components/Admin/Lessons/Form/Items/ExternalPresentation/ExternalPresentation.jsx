import { useTranslation } from 'react-i18next';

import useLessonItems from '@dc/hooks/useLessonItems';
import PresentationEdit from '@dc/components/Admin/Lessons/Form/Items/ExternalPresentation/Edit/Edit';
import PresentationNew from '@dc/components/Admin/Lessons/Form/Items/ExternalPresentation/New/New';
import { LessonItemDetailsModal } from '@dc/components/Admin/Lessons/Form/Items/LessonItemDetailsModal/LessonItemDetailsModal';

import { ReactComponent as PresentationIcon } from '@shared/assets/icons/presentation_icon.svg';
import { ListItem } from '@shared/components/SelectableList/ListItem/ListItem';

function AdminLessonsFormItemsExternalPresentation() {
  const { t } = useTranslation();
  const { addItem, formVisible, editingLessonItem, filteredItems, previewItem, setPreviewItem } =
    useLessonItems();

  const renderProperForm = () =>
    editingLessonItem ? <PresentationEdit presentation={editingLessonItem} /> : <PresentationNew />;

  const closePreviewModal = () => setPreviewItem(null);

  const handleEditClick = (item) => {
    window.open(
      `/admin/lesson-items/externalPresentations/${item.id}/edit?standaloneEdit=true`,
      '_blank',
      'noreferrer'
    );
  };

  if (formVisible) {
    return <div data-testid='externalPresentations-section'>{renderProperForm()}</div>;
  }

  return (
    <div data-testid='externalPresentations-section'>
      <ul className='lessons__items-list'>
        {!filteredItems.length ? (
          <span>{t('admin.lessons.items.emptyList')}</span>
        ) : (
          filteredItems.map((presentation) => (
            <ListItem
              key={presentation.id}
              Icon={PresentationIcon}
              name={presentation.name}
              onChange={() => addItem(presentation)}
              onDetailsClick={() => setPreviewItem(presentation)}
              onEditClick={() => handleEditClick(presentation)}
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

export default AdminLessonsFormItemsExternalPresentation;
