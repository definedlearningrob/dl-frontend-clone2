import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import type {
  TTaskPresentationSlide,
  TTaskPresentationText,
} from '@dc/graphql/user/queries/taskPresentation';
import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';

import { ReactComponent as ImagePlaceholder } from '@shared/svg/image_placeholder.svg';
import SharedButton from '@shared/components/Button/Button';
import { useCustomizeIframe } from '@shared/hooks/useCustomizeIframe';

import Links from '../../Shared/LinksSection/Editor/Editor';
import TextItem from '../../Shared/TextItem/Interactive/Interactive';

import styles from './Editor.module.sass';

type Props = {
  slide: TTaskPresentationSlide;
  handleSelectSlideContent: (object: { id: string; type: string } | null) => void;
  slides?: TTaskPresentationSlide[];
};

function AdminTasksPresentationBuilderTemplateIFrameEditor({
  slide,
  slide: { content },
  handleSelectSlideContent,
}: Props) {
  const { t } = useTranslation();
  const {
    scriptView: scriptViewObject,
    selectedSlideContent,
    setScriptView,
  } = usePresentationBuilder();

  const { iframeRef, iframeSrc } = useCustomizeIframe({
    iframeUrl: slide.iframeUrl,
  });

  const handleSelectVideo = () => handleSelectSlideContent({ type: 'iframe', id: '1' });
  const handleSelectScript = () => handleSelectSlideContent({ type: 'script', id: '1' });

  const isIFrameSelected = selectedSlideContent?.type === 'iframe';
  const scriptView = scriptViewObject ? scriptViewObject[slide.id] : false;
  const mainText = content.texts.find((item: TTaskPresentationText) => item.contentId === '1');
  const scriptText = content.texts.find((item: TTaskPresentationText) => item.contentId === '2');

  const handleSetScriptView = (bool: boolean) => {
    handleSelectSlideContent(null);
    setScriptView({ ...scriptViewObject, [slide.id]: bool });
  };
  const switchToScriptView = () => handleSetScriptView(true);
  const switchToIframeView = () => handleSetScriptView(false);

  const classes = cx(styles.iconWrapper, {
    [styles.selectedContent]: isIFrameSelected,
    [styles.hiddenBackground]: slide.iframeUrl && !scriptView,
  });

  const switchButtonClasses = cx(styles.switchButtons, {
    [styles.hidden]: !(content.texts.length > 1),
  });
  const titleClasses = cx('titleContainer', styles.textContainer);

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
        {!iframeSrc && <ImagePlaceholder className={styles.icon} />}
        {iframeSrc && <iframe ref={iframeRef} allowFullScreen={true} src={iframeSrc} />}
      </div>
    );

  return (
    <>
      <div className={switchButtonClasses}>
        <SharedButton
          className={scriptView ? styles.button : ''}
          size='sm'
          variant={scriptView ? 'primary-outlined' : 'primary'}
          onClick={switchToIframeView}>
          {t('admin.tasks.presentation.iframeLabel')}
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
      <div className={styles.iframeWrapper}>{renderContent()}</div>
      <Links handleSelectSlideContent={handleSelectSlideContent} links={slide.content.links} />
    </>
  );
}

export default AdminTasksPresentationBuilderTemplateIFrameEditor;
