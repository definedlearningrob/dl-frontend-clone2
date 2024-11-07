import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import SharedLessonItem from '@dc/components/Admin/Lessons/Form/Items/Shared/LessonItem/LessonItem';
import ResearchLinkDetailsModal from '@dc/components/Admin/Lessons/Form/Items/ResearchLink/ResearchLinkModal/ResearchLinkModal';

AdminLessonsFormItemsListResearchLinkItem.propTypes = {
  onRemove: PropTypes.func,
  researchLink: PropTypes.shape({
    __typename: PropTypes.string,
    author: PropTypes.string,
    name: PropTypes.string,
    resourceLink: PropTypes.string,
    sourceName: PropTypes.string,
  }),
};

function AdminLessonsFormItemsListResearchLinkItem({ researchLink, onRemove }) {
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const { t } = useTranslation();

  const openItemDetails = () => setDetailsModalOpen(true);
  const closeDetailsModal = () => setDetailsModalOpen(false);

  return (
    <>
      <SharedLessonItem
        identifier={researchLink.name}
        label={t('admin.lessons.items.researchLink.label')}
        testPrefix='research-link'
        onMore={openItemDetails}
        onRemove={onRemove}
      />
      {isDetailsModalOpen && (
        <ResearchLinkDetailsModal
          data={researchLink}
          isOpen={isDetailsModalOpen}
          onClose={closeDetailsModal}
        />
      )}
    </>
  );
}

export default AdminLessonsFormItemsListResearchLinkItem;
