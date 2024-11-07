import { useTranslation } from 'react-i18next';

import useLessonItems from '@dc/hooks/useLessonItems';
import VideoEdit from '@dc/components/Admin/Lessons/Form/Items/Video/Edit/Edit';
import VideoNew from '@dc/components/Admin/Lessons/Form/Items/Video/New/New';
import { LessonItemDetailsModal } from '@dc/components/Admin/Lessons/Form/Items/LessonItemDetailsModal/LessonItemDetailsModal';

import { ListItem } from '@shared/components/SelectableList/ListItem/ListItem';
import { ReactComponent as VideoIcon } from '@shared/assets/icons/video_icon.svg';

function AdminLessonsFormItemsVideo() {
  const { t } = useTranslation();
  const { addItem, formVisible, editingLessonItem, filteredItems, previewItem, setPreviewItem } =
    useLessonItems();

  const renderProperForm = () =>
    editingLessonItem ? <VideoEdit video={editingLessonItem} /> : <VideoNew />;

  const closePreviewModal = () => setPreviewItem(null);

  const handleEditClick = (item) => {
    window.open(
      `/admin/lesson-items/videos/${item.id}/edit?standaloneEdit=true`,
      '_blank',
      'noreferrer'
    );
  };

  if (formVisible) {
    return <div data-testid='videos-section'>{renderProperForm()}</div>;
  }

  return (
    <div data-testid='videos-section'>
      <>
        <ul className='lessons__items-list'>
          {!filteredItems.length ? (
            <span>{t('admin.lessons.items.emptyList')}</span>
          ) : (
            filteredItems.map((video) => (
              <ListItem
                key={video.id}
                Icon={VideoIcon}
                name={video.name}
                onChange={() => addItem(video)}
                onDetailsClick={() => setPreviewItem(video)}
                onEditClick={() => handleEditClick(video)}
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
      </>
    </div>
  );
}

export default AdminLessonsFormItemsVideo;
