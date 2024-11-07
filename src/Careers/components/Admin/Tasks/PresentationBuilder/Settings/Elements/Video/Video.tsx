import { useTranslation } from 'react-i18next';

import SharedTextEditor from '@dc/shared/TextEditor/TextEditor';
import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';
import type { TTaskPresentationText } from '@dc/graphql/user/queries/taskPresentation';
import {
  textToolbarConfig,
  headerToolbarConfig,
} from '@dc/components/shared/TextEditor/EditorToolbars/editorToolbars';

import { ReactComponent as ScriptIcon } from '@shared/assets/icons/final_report.svg';
import SharedButton from '@shared/components/Button/Button';
import SharedIcon from '@shared/components/Icon/Icon';
import { usePresentationState } from '@shared/hooks/usePresentationState';

import Links from '../Shared/Links/Links';

import styles from './Video.module.sass';
import VideoUpload from './VideoUpload/VideoUpload';

type Props = {
  contentStyle: string;
  handleEditorChange: (values: string, editedContentId: string) => void;
  shouldShowElement: (object: { type: string; id: string }) => boolean;
  getText: (id: string, texts: TTaskPresentationText[]) => TTaskPresentationText | undefined;
  texts: TTaskPresentationText[];
};

function AdminTasksPresentationBuilderSettingsElementsVideo({
  contentStyle,
  handleEditorChange,
  shouldShowElement,
  getText,
  texts,
}: Props) {
  const {
    handleUpdateSlide,
    isSaving,
    currentSlide,
    scriptView: scriptViewObject,
    selectedSlideContent,
  } = usePresentationBuilder();
  const { presentationDispatch } = usePresentationState();
  const { t } = useTranslation();

  const handleOnBlurEvent = () => handleUpdateSlide();

  const dispatchPendingStatus = () =>
    presentationDispatch({ type: 'SET_PRESENTATION_HAS_PENDING_CHANGES', payload: true });

  const mainText = getText('1', texts);
  const scriptText = getText('2', texts);
  const scriptView =
    scriptViewObject && currentSlide?.id ? scriptViewObject[currentSlide.id] : false;
  const shouldShowText = mainText && shouldShowElement({ type: 'text', id: '1' });
  const shouldShowScript =
    scriptText && shouldShowElement({ type: 'script', id: '1' }) && scriptView;
  const shouldShowVideo = shouldShowElement({ type: 'video', id: '1' }) && !scriptView;
  const shouldShowAddScriptVersion = texts.length < 2;

  const handleAddScript = async () => {
    const newTexts = [
      ...texts.map(({ contentId, value, style, type }: TTaskPresentationText) => ({
        contentId,
        value,
        style,
        type,
      })),
      {
        contentId: '2',
        value:
          // eslint-disable-next-line max-len
          '<p style="font-size: 21pt">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet nisi, maecenas scelerisque semper tristique ipsum molestie. Ac amet arcu eleifend aliquam massa a quis interdum urna. Vitae tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet nisi, maecenas scelerisque semper tristique ipsum molestie. Vitae tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet nisi, maecenas scelerisque semper tristique ipsum molestie.</p>',
        style: '',
        type: 'text',
      },
    ];

    handleUpdateSlide(null, { textItems: newTexts });
  };

  const renderEditor = (text: TTaskPresentationText) => (
    <SharedTextEditor
      key={text.contentId}
      contentStyle={contentStyle}
      data-testid='presentation-builder-description-input'
      disabled={isSaving}
      editorConfig={{
        ...text,
        onChange: (values) => handleEditorChange(values, text.contentId),
        onBlur: handleOnBlurEvent,
        onDirty: dispatchPendingStatus,
      }}
      id={text.contentId}
      label={text.type}
      toolbar={text.type === 'header' ? headerToolbarConfig : textToolbarConfig}
    />
  );

  return (
    <div className='animate-fadeDropIn'>
      {shouldShowAddScriptVersion && !selectedSlideContent && (
        <SharedButton
          className={styles.button}
          size='sm'
          variant='primary-outlined'
          onClick={handleAddScript}>
          <SharedIcon icon={<ScriptIcon />} size='sm' />
          {t('admin.tasks.presentation.addScript')}
        </SharedButton>
      )}
      <div className='flex flex-col gap-sm'>
        {shouldShowText && renderEditor(mainText)}
        {shouldShowScript && renderEditor(scriptText)}
        {shouldShowVideo && <VideoUpload contentId='1' />}
        {currentSlide?.content?.links && (
          <Links links={currentSlide.content.links} shouldShowElement={shouldShowElement} />
        )}
      </div>
    </div>
  );
}

export default AdminTasksPresentationBuilderSettingsElementsVideo;
