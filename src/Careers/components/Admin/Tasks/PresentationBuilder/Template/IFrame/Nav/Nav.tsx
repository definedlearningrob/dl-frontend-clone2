import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';
import type { TTaskPresentationSlide } from '@dc/graphql/user/queries/taskPresentation';

import { ReactComponent as ImagePlaceholder } from '@shared/svg/image_placeholder.svg';
import SharedButton from '@shared/components/Button/Button';

import Links from '../../Shared/LinksSection/Nav/Nav';
import TextItem from '../../Shared/TextItem/Basic/Basic';

import styles from './Nav.module.sass';

type Props = {
  slide: TTaskPresentationSlide;
  handleSelectSlideContent?: (object: { id: string; type: string }) => void;
  slides?: TTaskPresentationSlide[];
};

function AdminTasksPresentationBuilderTemplateIFrameNav({ slide, slide: { content } }: Props) {
  const { t } = useTranslation();
  const { scriptView: scriptViewObject } = usePresentationBuilder();
  const [text, scriptText] = content.texts;
  const scriptView = scriptViewObject ? scriptViewObject[slide.id] : false;
  const classes = cx(styles.iconWrapper, {
    [styles.hiddenBackground]: slide.iframeUrl && !scriptView,
  });
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
        {!slide.iframeUrl && <ImagePlaceholder className={styles.icon} />}
        {slide.iframeUrl && <iframe allowFullScreen={true} src={slide.iframeUrl} />}
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
      <div className={styles.iframeWrapper}>{renderContent()}</div>
      <div className={styles.links}>
        <Links links={slide.content.links} />
      </div>
    </>
  );
}

export default AdminTasksPresentationBuilderTemplateIFrameNav;
