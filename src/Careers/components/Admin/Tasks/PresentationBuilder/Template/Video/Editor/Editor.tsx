import cx from 'classnames';
import ReactPlayer from 'react-player';
import { useTranslation } from 'react-i18next';

import type {
  TTaskPresentationSlide,
  TTaskPresentationText,
} from '@dc/graphql/user/queries/taskPresentation';
import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';

import { ReactComponent as VideoPlaceholder } from '@shared/svg/video_placeholder.svg';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import SharedProgressBar from '@shared/components/ProgressBar/ProgressBar';
import SharedButton from '@shared/components/Button/Button';

import Links from '../../Shared/LinksSection/Editor/Editor';
import TextItem from '../../Shared/TextItem/Interactive/Interactive';

import styles from './Editor.module.sass';

type Props = {
  slide: TTaskPresentationSlide;
  handleSelectSlideContent: (object: { id: string; type: string } | null) => void;
  slides?: TTaskPresentationSlide[];
};

function AdminTasksPresentationBuilderTemplateVideoEditor({
  slide,
  slide: { content },
  handleSelectSlideContent,
}: Props) {
  const {
    selectedSlideContent,
    videosUploading,
    scriptView: scriptViewObject,
    setScriptView,
  } = usePresentationBuilder();

  const { t } = useTranslation();

  const uploadingVideo = videosUploading.find(
    (video: { contentId: string; progress: number }) => video.contentId === '1'
  );

  const handleSelectVideo = () => handleSelectSlideContent({ type: 'video', id: '1' });
  const handleSelectScript = () => handleSelectSlideContent({ type: 'script', id: '1' });
  const isVideoSelected =
    selectedSlideContent?.type === 'video' && selectedSlideContent?.id === '1';
  const isScriptSelected =
    selectedSlideContent?.type === 'script' && selectedSlideContent?.id === '1';

  const mainText = content.texts.find((item: TTaskPresentationText) => item.contentId === '1');
  const scriptText = content.texts.find((item: TTaskPresentationText) => item.contentId === '2');
  const [video] = content.videos;

  const scriptView = scriptViewObject ? scriptViewObject[slide.id] : false;

  const handleSetScriptView = (bool: boolean) => {
    handleSelectSlideContent(null);
    setScriptView({ ...scriptViewObject, [slide.id]: bool });
  };
  const switchToScriptView = () => handleSetScriptView(true);
  const switchToVideoView = () => handleSetScriptView(false);

  const classes = cx(styles.iconWrapper, 'presentation__video', {
    [styles.hiddenBackground]: video && !scriptView,
    [styles.scriptView]: scriptView,
  });
  const wrapperClasses = cx(styles.videoWrapper, {
    [styles.selectedContent]: isVideoSelected || isScriptSelected,
  });

  const switchButtonClasses = cx(styles.switchButtons, {
    [styles.hidden]: !(content.texts.length > 1),
  });

  const renderContent = () =>
    scriptView ? (
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: scriptText?.value || '' }}
        className={classes}
        onClick={handleSelectScript}
      />
    ) : (
      <div className={classes} onClick={handleSelectVideo}>
        {!video && !uploadingVideo && <VideoPlaceholder className={styles.icon} />}
        {!!uploadingVideo && <SharedLoadingSpinner color='white' />}
        {video && (
          <ReactPlayer
            controls={true}
            height='100%'
            playing={false}
            url={video.url || video.videoUrl}
            width='100%'
          />
        )}
      </div>
    );
  const titleClasses = cx('titleContainer', styles.textContainer);

  return (
    <>
      <div className={switchButtonClasses}>
        <SharedButton
          className={scriptView ? styles.button : ''}
          size='sm'
          variant={scriptView ? 'primary-outlined' : 'primary'}
          onClick={switchToVideoView}>
          {t('admin.tasks.presentation.videoLabel')}
        </SharedButton>
        <SharedButton
          className={scriptView ? '' : styles.button}
          size='sm'
          variant={scriptView ? 'primary' : 'primary-outlined'}
          onClick={switchToScriptView}>
          {t('admin.tasks.presentation.scriptLabel')}
        </SharedButton>
      </div>
      {mainText && (
        <div className={titleClasses}>
          <TextItem
            key={mainText.contentId}
            handleSelectSlideContent={handleSelectSlideContent}
            item={mainText}
          />
        </div>
      )}
      <div className={wrapperClasses}>{renderContent()}</div>
      {!!uploadingVideo && !scriptView && (
        <div className={styles.progressWrapper}>
          <SharedProgressBar progress={uploadingVideo.progress} />
        </div>
      )}
      <div className={styles.links}>
        <Links handleSelectSlideContent={handleSelectSlideContent} links={content.links} />
      </div>
    </>
  );
}

export default AdminTasksPresentationBuilderTemplateVideoEditor;
