import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import SharedLessonItem from '@dc/components/Admin/Lessons/Form/Items/Shared/LessonItem/LessonItem';
import VocabularyDetailsModal from '@dc/components/Admin/Lessons/Form/Items/Vocabulary/VocabularyModal/VocabularyModal';

AdminLessonsFormItemsListVocabularyItem.propTypes = {
  onRemove: PropTypes.func,
  vocabulary: PropTypes.shape({
    __typename: PropTypes.string,
    definition: PropTypes.string,
    term: PropTypes.string,
  }),
};

function AdminLessonsFormItemsListVocabularyItem({ vocabulary, onRemove }) {
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const { t } = useTranslation();

  const openItemDetails = () => setDetailsModalOpen(true);
  const closeDetailsModal = () => setDetailsModalOpen(false);

  return (
    <>
      <SharedLessonItem
        identifier={vocabulary.term}
        label={t('admin.lessons.items.vocabulary.label')}
        testPrefix='vocabulary'
        onMore={openItemDetails}
        onRemove={onRemove}
      />
      {isDetailsModalOpen && (
        <VocabularyDetailsModal
          data={vocabulary}
          isOpen={isDetailsModalOpen}
          onClose={closeDetailsModal}
        />
      )}
    </>
  );
}

export default AdminLessonsFormItemsListVocabularyItem;
