import { useTranslation } from 'react-i18next';

import AttachmentEdit from '@dc/components/Admin/Lessons/Form/Items/Attachment/Edit/Edit';
import AttachmentDetailsModal from '@dc/components/Admin/Lessons/Form/Items/Attachment/AttachmentModal/AttachmentModal';
import AttachmentNew from '@dc/components/Admin/Lessons/Form/Items/Attachment/New/New';
import useLessonItems from '@dc/hooks/useLessonItems';

import { ReactComponent as AttachmentIcon } from '@shared/assets/icons/attachment_icon.svg';
import { ListItem } from '@shared/components/SelectableList/ListItem/ListItem';

function AdminLessonsFormItemsAttachment() {
  const { t } = useTranslation();
  const { addItem, formVisible, editingLessonItem, filteredItems, previewItem, setPreviewItem } =
    useLessonItems();

  const renderProperForm = () =>
    editingLessonItem ? <AttachmentEdit attachment={editingLessonItem} /> : <AttachmentNew />;

  const closePreviewModal = () => setPreviewItem(null);

  const handleEditClick = (item) => {
    window.open(
      `/admin/lesson-items/attachments/${item.id}/edit?standaloneEdit=true`,
      '_blank',
      'noreferrer'
    );
  };

  if (formVisible) {
    return <div data-testid='attachments-section'>{renderProperForm()}</div>;
  }

  return (
    <div data-testid='attachments-section'>
      <ul className='lessons__items-list'>
        {!filteredItems.length ? (
          <span>{t('admin.lessons.items.emptyList')}</span>
        ) : (
          filteredItems.map((attachment) => (
            <ListItem
              key={attachment.id}
              Icon={AttachmentIcon}
              name={attachment.name}
              onChange={() => addItem(attachment)}
              onDetailsClick={() => setPreviewItem(attachment)}
              onEditClick={() => handleEditClick(attachment)}
            />
          ))
        )}
      </ul>
      {previewItem && (
        <AttachmentDetailsModal
          attachmentId={previewItem.id}
          isOpen={!!previewItem}
          onClose={closePreviewModal}
        />
      )}
    </div>
  );
}

export default AdminLessonsFormItemsAttachment;
