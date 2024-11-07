import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line max-len
import ExternalPresentationDetailsModal from '@dc/components/Admin/Lessons/Form/Items/ExternalPresentation/ExternalPresentationModal/ExternalPresentationModal';
import SharedLessonItem from '@dc/components/Admin/Lessons/Form/Items/Shared/LessonItem/LessonItem';

AdminLessonsFormItemsListPresentationItem.propTypes = {
  onRemove: PropTypes.func,
  presentation: PropTypes.shape({
    __typename: PropTypes.string,
    name: PropTypes.string,
    source: PropTypes.string,
  }),
};

function AdminLessonsFormItemsListPresentationItem({ presentation, onRemove }) {
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const { t } = useTranslation();

  const openItemDetails = () => setDetailsModalOpen(true);
  const closeDetailsModal = () => setDetailsModalOpen(false);

  return (
    <>
      <SharedLessonItem
        identifier={presentation.name}
        label={t('admin.lessons.items.presentation.label')}
        testPrefix='presentation'
        onMore={openItemDetails}
        onRemove={onRemove}
      />
      {isDetailsModalOpen && (
        <ExternalPresentationDetailsModal
          data={presentation}
          isOpen={isDetailsModalOpen}
          onClose={closeDetailsModal}
        />
      )}
    </>
  );
}

export default AdminLessonsFormItemsListPresentationItem;
