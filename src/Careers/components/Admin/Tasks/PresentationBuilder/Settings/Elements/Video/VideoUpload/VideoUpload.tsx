import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { ChangeEvent } from 'react';

import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';

import { ReactComponent as VideoPlaceholder } from '@shared/svg/video_placeholder.svg';
import DropableArea from '@shared/components/DropableArea/DropableArea';
import SharedIcon from '@shared/components/Icon/Icon';

import styles from './VideoUpload.module.sass';
import UrlForm from './UrlForm/UrlForm';
import VideoItem from './VideoItem/VideoItem';

type Props = {
  contentId: '1';
};

// Video index is for multiple choice slide when there will be more than one video inputs in one slide
function AdminTasksPresentationBuilderSettingsElementsVideoUpload({ contentId }: Props) {
  const { t } = useTranslation();
  const {
    handleVideoUpload,
    handleSlideVideoArchive,
    currentSlide,
    videosUploading,
    handleVideoUrlSave,
    handleVideoUrlUpdate,
  } = usePresentationBuilder();
  const video = currentSlide?.content.videos.find(
    ({ contentId: cId }: { contentId: string }) => cId === contentId
  );
  const savingVideo = videosUploading.find(
    (video: { contentId: string; progress: number }) => video.contentId === contentId
  );

  const shouldShowSelectedSection = (video && video.url) || !!savingVideo;

  const handleClearVideo = () => {
    if (video) {
      handleSlideVideoArchive(video.id);
    }
  };

  const handleDrop = async (files: File[] | FileList) => {
    const [file] = files;

    if (video) {
      await handleSlideVideoArchive(video.id);
    }

    if (file) {
      handleVideoUpload(file, '1');
    }
  };

  const handleUrlSubmit = async (values: { url: string }) => {
    if (video && video.url) {
      await handleSlideVideoArchive(video.id);
    }

    if (video && video.videoUrl) {
      handleVideoUrlUpdate(video, values.url);
    } else {
      handleVideoUrlSave(values.url, '1');
    }
  };

  const handleChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;

    if (target) {
      handleDrop(target.files || []);
    }
  };

  const InputLabel = () => (
    <span className={styles.label}>
      <SharedIcon className={styles.icon} icon={<VideoPlaceholder />} size='xs' />
      <span>{t('admin.tasks.presentation.videoLabel')}</span>
    </span>
  );

  const dropableWrapperClasses = cx(styles.dropableWrapper, {
    [styles.hidden]: shouldShowSelectedSection,
  });

  return (
    <section className='flex flex-col gap-xs'>
      <div className={dropableWrapperClasses}>
        <DropableArea
          accept='video/*'
          assetType='video'
          label={<InputLabel />}
          multiple={false}
          onClear={handleClearVideo}
          onDrop={handleDrop}
        />
      </div>
      {shouldShowSelectedSection && (
        <div>
          <div className={styles.inputHeader}>
            <InputLabel />
            {video && (
              <button className={styles.clear} onClick={handleClearVideo}>
                {t('admin.tasks.presentation.clear')}
              </button>
            )}
          </div>
          <VideoItem savingVideo={savingVideo} video={video} onReplace={handleChange} />
        </div>
      )}
      <UrlForm
        savingVideo={!!savingVideo}
        video={video}
        onClear={handleClearVideo}
        onSubmit={handleUrlSubmit}
      />
    </section>
  );
}

export default AdminTasksPresentationBuilderSettingsElementsVideoUpload;
