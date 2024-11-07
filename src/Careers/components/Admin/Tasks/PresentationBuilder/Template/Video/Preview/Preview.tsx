import cx from 'classnames';
import ReactPlayer from 'react-player';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import type {
  TTaskPresentationSlide,
  TTaskPresentationText,
} from '@dc/graphql/user/queries/taskPresentation';

import { ReactComponent as VideoPlaceholder } from '@shared/svg/video_placeholder.svg';
import SharedButton from '@shared/components/Button/Button';

import Links from '../../Shared/LinksSection/Preview/Preview';
import TextItem from '../../Shared/TextItem/Basic/Basic';

import styles from './Preview.module.sass';

type Props = {
  slide: TTaskPresentationSlide;
  handleSelectSlideContent: (object: { id: string; type: string } | null) => void;
  slides: TTaskPresentationSlide[];
};

function AdminTasksPresentationBuilderTemplateVideoPreview({ slide: { content }, slides }: Props) {
  const [video] = content.videos;
  const [scriptView, setScriptView] = useState(false);
  const { t } = useTranslation();

  const classes = cx(styles.iconWrapper, 'presentation__video', {
    [styles.hiddenBackground]: video && !scriptView,
  });

  const mainText = content.texts.find((item: TTaskPresentationText) => item.contentId === '1');
  const scriptText = content.texts.find((item: TTaskPresentationText) => item.contentId === '2');

  const switchToScriptView = () => setScriptView(true);
  const switchToVideoView = () => setScriptView(false);

  const renderContent = () =>
    scriptView ? (
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: scriptText?.value || '' }}
        className={classes}
      />
    ) : (
      <div className={classes}>
        {!video && <VideoPlaceholder className={styles.icon} />}
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

  return (
    <div>
      {content.texts.length > 1 && (
        <div className={styles.switchButtons}>
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
      )}
      <div className='titleContainer'>
        <div className={styles.textContainer}>
          {mainText && (
            <div className={styles.textContainer}>
              <TextItem item={mainText} />
            </div>
          )}
        </div>
      </div>
      <div className={styles.videoWrapper}>{renderContent()}</div>
      <div className={styles.links}>
        <Links links={content.links} slides={slides} />
      </div>
    </div>
  );
}

export default AdminTasksPresentationBuilderTemplateVideoPreview;
