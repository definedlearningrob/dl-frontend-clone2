import { useTranslation } from 'react-i18next';

import useLessonItems from '@dc/hooks/useLessonItems';
import ResearchLinkEdit from '@dc/components/Admin/Lessons/Form/Items/ResearchLink/Edit/Edit';
import ResearchLinkNew from '@dc/components/Admin/Lessons/Form/Items/ResearchLink/New/New';
import { LessonItemDetailsModal } from '@dc/components/Admin/Lessons/Form/Items/LessonItemDetailsModal/LessonItemDetailsModal';

import { ReactComponent as LinkIcon } from '@shared/assets/icons/link_icon.svg';
import { ListItem } from '@shared/components/SelectableList/ListItem/ListItem';

function AdminLessonsFormItemsResearchLink() {
  const { t } = useTranslation();
  const { addItem, formVisible, editingLessonItem, filteredItems, previewItem, setPreviewItem } =
    useLessonItems();

  const renderProperForm = () =>
    editingLessonItem ? <ResearchLinkEdit researchLink={editingLessonItem} /> : <ResearchLinkNew />;

  const closePreviewModal = () => setPreviewItem(null);

  const handleEditClick = (item) => {
    window.open(
      `/admin/lesson-items/research-links/${item.id}/edit?standaloneEdit=true`,
      '_blank',
      'noreferrer'
    );
  };

  if (formVisible) {
    return <div data-testid='research-links-section'>{renderProperForm()}</div>;
  }

  return (
    <div data-testid='research-links-section'>
      <ul className='lessons__items-list'>
        {!filteredItems.length ? (
          <span>{t('admin.lessons.items.emptyList')}</span>
        ) : (
          filteredItems.map((link) => (
            <ListItem
              key={link.id}
              Icon={LinkIcon}
              name={link.name}
              onChange={() => addItem(link)}
              onDetailsClick={() => setPreviewItem(link)}
              onEditClick={() => handleEditClick(link)}
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

export default AdminLessonsFormItemsResearchLink;
