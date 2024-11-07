import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import SharedLessonItem from '@dc/components/Admin/Lessons/Form/Items/Shared/LessonItem/LessonItem';
import AttachmentDetailsModal from '@dc/components/Admin/Lessons/Form/Items/Attachment/AttachmentModal/AttachmentModal';

AdminLessonsFormItemsListAttachmentItem.propTypes = {
  attachment: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  onRemove: PropTypes.func,
};

function AdminLessonsFormItemsListAttachmentItem({ attachment, onRemove }) {
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const { t } = useTranslation();

  const openItemDetails = () => setDetailsModalOpen(true);
  const closeDetailsModal = () => setDetailsModalOpen(false);

  return (
    <>
      <SharedLessonItem
        identifier={attachment.name}
        label={t('admin.lessons.items.attachment.label')}
        testPrefix='attachment'
        onMore={openItemDetails}
        onRemove={onRemove}
      />
      {isDetailsModalOpen && (
        <AttachmentDetailsModal
          attachmentId={attachment.id}
          isOpen={isDetailsModalOpen}
          onClose={closeDetailsModal}
        />
      )}
    </>
  );
}

export default AdminLessonsFormItemsListAttachmentItem;
