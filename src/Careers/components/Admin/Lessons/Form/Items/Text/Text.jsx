import { useTranslation } from 'react-i18next';

import useLessonItems from '@dc/hooks/useLessonItems';
import TextEdit from '@dc/components/Admin/Lessons/Form/Items/Text/Edit/Edit';
import TextNew from '@dc/components/Admin/Lessons/Form/Items/Text/New/New';
import { LessonItemDetailsModal } from '@dc/components/Admin/Lessons/Form/Items/LessonItemDetailsModal/LessonItemDetailsModal';

import { ReactComponent as TextIcon } from '@shared/assets/icons/text_icon.svg';
import { ListItem } from '@shared/components/SelectableList/ListItem/ListItem';

function AdminLessonsFormItemsText() {
  const { t } = useTranslation();
  const { addItem, formVisible, editingLessonItem, filteredItems, previewItem, setPreviewItem } =
    useLessonItems();

  const renderProperForm = () =>
    editingLessonItem ? <TextEdit text={editingLessonItem} /> : <TextNew />;

  const closePreviewModal = () => setPreviewItem(null);

  const handleEditClick = (item) => {
    window.open(
      `/admin/lesson-items/texts/${item.id}/edit?standaloneEdit=true`,
      '_blank',
      'noreferrer'
    );
  };

  if (formVisible) {
    return <div data-testid='texts-section'>{renderProperForm()}</div>;
  }

  return (
    <div data-testid='texts-section'>
      <ul className='lessons__items-list'>
        {!filteredItems.length ? (
          <span>{t('admin.lessons.items.emptyList')}</span>
        ) : (
          filteredItems.map((text) => (
            <ListItem
              key={text.id}
              Icon={TextIcon}
              name={text.name}
              onChange={() => addItem(text)}
              onDetailsClick={() => setPreviewItem(text)}
              onEditClick={() => handleEditClick(text)}
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

export default AdminLessonsFormItemsText;
