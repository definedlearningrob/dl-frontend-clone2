import cx from 'classnames';
import ReactPlayer from 'react-player';
import { useTranslation } from 'react-i18next';

import type { TTaskPresentationSlide } from '@dc/graphql/user/queries/taskPresentation';
import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';

import { ReactComponent as VideoPlaceholder } from '@shared/svg/video_placeholder.svg';
import SharedButton from '@shared/components/Button/Button';

import Links from '../../Shared/LinksSection/Nav/Nav';
import TextItem from '../../Shared/TextItem/Basic/Basic';

import styles from './Nav.module.sass';

type Props = {
  slide: TTaskPresentationSlide;
  handleSelectSlideContent: (object: { id: string; type: string } | null) => void;
  slides?: TTaskPresentationSlide[];
};

function AdminTasksPresentationBuilderTemplateVideoPreview({ slide, slide: { content } }: Props) {
  const [video] = content.videos;
  const { scriptView: scriptViewObject } = usePresentationBuilder();
  const { t } = useTranslation();

  const scriptView = scriptViewObject ? scriptViewObject[slide.id] : false;

  const classes = cx(styles.iconWrapper, 'presentation__video', {
    [styles.hiddenBackground]: video && !scriptView,
    [styles.scriptView]: scriptView,
  });

  const [text, scriptText] = content.texts;

  const switchButtonClasses = cx(styles.switchButtons, {
    [styles.hidden]: !(content.texts.length > 1),
  });

  const renderContent = () =>
    scriptView ? (
      <div className={classes}>
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: scriptText?.value || '' }}
          className={styles.scriptWrapper}
        />
      </div>
    ) : (
      <div className={classes}>
        {!video && <VideoPlaceholder className={styles.icon} />}
        {video && (
          <ReactPlayer
            controls={false}
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
          variant={scriptView ? 'primary-outlined' : 'primary'}>
          {t('admin.tasks.presentation.videoLabel')}
        </SharedButton>
        <SharedButton
          className={scriptView ? '' : styles.button}
          size='sm'
          variant={scriptView ? 'primary' : 'primary-outlined'}>
          {t('admin.tasks.presentation.scriptLabel')}
        </SharedButton>
      </div>
      <div className={titleClasses}>{text && <TextItem item={text} />}</div>
      <div className={styles.videoWrapper}>{renderContent()}</div>
      <div className={styles.links}>
        <Links links={content.links} />
      </div>
    </>
  );
}

export default AdminTasksPresentationBuilderTemplateVideoPreview;
