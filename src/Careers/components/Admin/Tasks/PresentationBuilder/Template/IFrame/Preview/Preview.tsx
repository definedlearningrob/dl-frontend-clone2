import cx from 'classnames';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import type {
  TTaskPresentationSlide,
  TTaskPresentationText,
} from '@dc/graphql/user/queries/taskPresentation';

import { ReactComponent as ImagePlaceholder } from '@shared/svg/image_placeholder.svg';
import SharedButton from '@shared/components/Button/Button';
import { useCustomizeIframe } from '@shared/hooks/useCustomizeIframe';

import Links from '../../Shared/LinksSection/Preview/Preview';
import TextItem from '../../Shared/TextItem/Basic/Basic';

import styles from './Preview.module.sass';

type Props = {
  slide: TTaskPresentationSlide;
  handleSelectSlideContent?: (object: { id: string; type: string }) => void;
  slides: TTaskPresentationSlide[];
};

function AdminTasksPresentationBuilderTemplateIFramePreview({
  slide,
  slide: { content },
  slides,
}: Props) {
  const { t } = useTranslation();
  const [scriptView, setScriptView] = useState(false);
  const mainText = content.texts.find((item: TTaskPresentationText) => item.contentId === '1');
  const scriptText = content.texts.find((item: TTaskPresentationText) => item.contentId === '2');
  const classes = cx(styles.iconWrapper, {
    [styles.hiddenBackground]: slide.iframeUrl && !scriptView,
  });

  const switchToScriptView = () => setScriptView(true);
  const switchToIframeView = () => setScriptView(false);

  const { iframeRef, iframeSrc } = useCustomizeIframe({
    iframeUrl: slide.iframeUrl,
  });

  const renderContent = () =>
    scriptView ? (
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: scriptText?.value || '' }}
        className={classes}
      />
    ) : (
      <div className={classes}>
        {!iframeSrc && <ImagePlaceholder className={styles.icon} />}
        {iframeSrc && <iframe ref={iframeRef} allowFullScreen={true} src={iframeSrc} />}
      </div>
    );
  const titleClasses = cx('titleContainer', styles.textContainer);

  return (
    <>
      {content.texts.length > 1 && (
        <div className={styles.switchButtons}>
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
      )}
      <div className={titleClasses}>
        {mainText && (
          <div className={styles.textContainer}>
            <TextItem key={mainText.contentId} item={mainText} />
          </div>
        )}
      </div>
      <div className={styles.iframeWrapper}>{renderContent()}</div>
      <Links links={slide.content.links} slides={slides} />
    </>
  );
}

export default AdminTasksPresentationBuilderTemplateIFramePreview;
