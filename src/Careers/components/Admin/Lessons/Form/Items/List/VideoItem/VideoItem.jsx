import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import SharedLessonItem from '@dc/components/Admin/Lessons/Form/Items/Shared/LessonItem/LessonItem';
import VideoDetailsModal from '@dc/components/Admin/Lessons/Form/Items/Video/VideoModal/VideoModal';

AdminLessonsFormItemsListVideoItem.propTypes = {
  onRemove: PropTypes.func,
  video: PropTypes.shape({
    __typename: PropTypes.string,
    description: PropTypes.string,
    filename: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
  }),
};

function AdminLessonsFormItemsListVideoItem({ video, onRemove }) {
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const { t } = useTranslation();

  const openItemDetails = () => setDetailsModalOpen(true);
  const closeDetailsModal = () => setDetailsModalOpen(false);

  return (
    <>
      <SharedLessonItem
        identifier={video.name}
        label={t('admin.lessons.items.video.label')}
        testPrefix='video'
        onMore={openItemDetails}
        onRemove={onRemove}
      />
      {isDetailsModalOpen && (
        <VideoDetailsModal data={video} isOpen={isDetailsModalOpen} onClose={closeDetailsModal} />
      )}
    </>
  );
}

export default AdminLessonsFormItemsListVideoItem;
