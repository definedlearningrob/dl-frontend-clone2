import SharedTextEditor from '@dc/shared/TextEditor/TextEditor';
import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';
import { TTaskPresentationText } from '@dc/graphql/user/queries/taskPresentation';
import {
  textToolbarConfig,
  headerToolbarConfig,
} from '@dc/components/shared/TextEditor/EditorToolbars/editorToolbars';

import { usePresentationState } from '@shared/hooks/usePresentationState';

import Links from '../Shared/Links/Links';
import NoFitMessage from '../Shared/NoFitMessage/NoFitMessage';

type Props = {
  contentStyle: string;
  handleEditorChange: (values: string, editedContentId: string) => void;
  shouldShowElement: (object: { type: string; id: string }) => boolean;
  texts: TTaskPresentationText[];
  getText: (id: string, texts: TTaskPresentationText[]) => TTaskPresentationText | undefined;
};

function AdminTasksPresentationBuilderSettingsElementsBasicText({
  contentStyle,
  handleEditorChange,
  shouldShowElement,
  texts,
  getText,
}: Props) {
  const { presentationDispatch } = usePresentationState();
  const { handleUpdateSlide, isSaving, currentSlide, overflowingItems } = usePresentationBuilder();

  const handleOnBlurEvent = () => handleUpdateSlide();

  const firstText = getText('1', texts);
  const secondText = getText('2', texts);

  const shouldShowFirstText = firstText && shouldShowElement({ type: 'text', id: '1' });
  const shouldShowSecondText = secondText && shouldShowElement({ type: 'text', id: '2' });

  const dispatchPendingStatus = () =>
    presentationDispatch({ type: 'SET_PRESENTATION_HAS_PENDING_CHANGES', payload: true });

  const renderEditor = (text: TTaskPresentationText) => (
    <>
      <SharedTextEditor
        key={text.contentId}
        contentStyle={contentStyle}
        data-testid='presentation-builder-description-input'
        disabled={isSaving}
        editorConfig={{
          ...text,
          onChange: (values) => {
            handleEditorChange(values, text.contentId);
          },
          onBlur: handleOnBlurEvent,
          onDirty: dispatchPendingStatus,
        }}
        id={text.contentId}
        label={text.type}
        toolbar={text.type === 'header' ? headerToolbarConfig : textToolbarConfig}
      />
      {!(text.type === 'header') && (
        <NoFitMessage visible={!!overflowingItems && overflowingItems[text.contentId]} />
      )}
    </>
  );

  return (
    <div className='animate-fadeDropIn'>
      {shouldShowFirstText && renderEditor(firstText)}
      {shouldShowSecondText && renderEditor(secondText)}
      {currentSlide && (
        <Links links={currentSlide.content.links} shouldShowElement={shouldShowElement} />
      )}
    </div>
  );
}

export default AdminTasksPresentationBuilderSettingsElementsBasicText;
