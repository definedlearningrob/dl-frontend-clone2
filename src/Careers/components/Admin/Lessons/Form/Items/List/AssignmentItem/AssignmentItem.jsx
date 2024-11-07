import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AssignmentDetailsModal from '@dc/components/Admin/Lessons/Form/Items/Assignment/AssignmentModal/AssignmentModal';
import SharedLessonItem from '@dc/components/Admin/Lessons/Form/Items/Shared/LessonItem/LessonItem';

AdminLessonsFormItemsListAssignmentItem.propTypes = {
  assignment: PropTypes.shape({
    __typename: PropTypes.string,
    assetName: PropTypes.string,
    description: PropTypes.string,
  }),
  onRemove: PropTypes.func,
};

function AdminLessonsFormItemsListAssignmentItem({ assignment, onRemove }) {
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const { t } = useTranslation();

  const openItemDetails = () => setDetailsModalOpen(true);
  const closeDetailsModal = () => setDetailsModalOpen(false);

  return (
    <>
      <SharedLessonItem
        identifier={assignment.assetName}
        label={t('admin.lessons.items.assignment.label')}
        testPrefix='assignment'
        onMore={openItemDetails}
        onRemove={onRemove}
      />
      {isDetailsModalOpen && (
        <AssignmentDetailsModal
          data={assignment}
          isOpen={isDetailsModalOpen}
          onClose={closeDetailsModal}
        />
      )}
    </>
  );
}

export default AdminLessonsFormItemsListAssignmentItem;
