import { useTranslation } from 'react-i18next';

import useLessonItems from '@dc/hooks/useLessonItems';
import VocabularyEdit from '@dc/components/Admin/Lessons/Form/Items/Vocabulary/Edit/Edit';
import VocabularyNew from '@dc/components/Admin/Lessons/Form/Items/Vocabulary/New/New';
import { LessonItemDetailsModal } from '@dc/components/Admin/Lessons/Form/Items/LessonItemDetailsModal/LessonItemDetailsModal';

import { ReactComponent as VocabularyIcon } from '@shared/assets/icons/vocabulary_icon.svg';
import { ListItem } from '@shared/components/SelectableList/ListItem/ListItem';

function AdminLessonsFormItemsVocabulary() {
  const { t } = useTranslation();
  const { addItem, formVisible, editingLessonItem, filteredItems, previewItem, setPreviewItem } =
    useLessonItems();

  const renderProperForm = () =>
    editingLessonItem ? <VocabularyEdit vocabulary={editingLessonItem} /> : <VocabularyNew />;

  const closePreviewModal = () => setPreviewItem(null);

  const handleEditClick = (item) => {
    window.open(
      `/admin/lesson-items/vocabularies/${item.id}/edit?standaloneEdit=true`,
      '_blank',
      'noreferrer'
    );
  };

  if (formVisible) {
    return <div data-testid='vocabularies-section'>{renderProperForm()}</div>;
  }

  return (
    <div data-testid='vocabularies-section'>
      <ul className='lessons__items-list'>
        {!filteredItems.length ? (
          <span>{t('admin.lessons.items.emptyList')}</span>
        ) : (
          filteredItems.map((vocab) => (
            <ListItem
              key={vocab.id}
              Icon={VocabularyIcon}
              name={vocab.term}
              onChange={() => addItem(vocab)}
              onDetailsClick={() => setPreviewItem(vocab)}
              onEditClick={() => handleEditClick(vocab)}
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

export default AdminLessonsFormItemsVocabulary;
