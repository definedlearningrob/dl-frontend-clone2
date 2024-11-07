import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import SharedLessonItem from '@dc/components/Admin/Lessons/Form/Items/Shared/LessonItem/LessonItem';
import TextDetailsModal from '@dc/components/Admin/Lessons/Form/Items/Text/TextModal/TextModal';

AdminLessonsFormItemsListTextItem.propTypes = {
  onRemove: PropTypes.func,
  text: PropTypes.shape({
    __typename: PropTypes.string,
    content: PropTypes.string,
    name: PropTypes.string,
  }),
};

function AdminLessonsFormItemsListTextItem({ text, onRemove }) {
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const { t } = useTranslation();

  const openItemDetails = () => setDetailsModalOpen(true);
  const closeDetailsModal = () => setDetailsModalOpen(false);

  return (
    <>
      <SharedLessonItem
        identifier={text.name}
        label={t('admin.lessons.items.text.label')}
        testPrefix='text'
        onMore={openItemDetails}
        onRemove={onRemove}
      />
      {isDetailsModalOpen && (
        <TextDetailsModal data={text} isOpen={isDetailsModalOpen} onClose={closeDetailsModal} />
      )}
    </>
  );
}

export default AdminLessonsFormItemsListTextItem;
