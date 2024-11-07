import SharedTextEditor from '@dc/shared/TextEditor/TextEditor';
import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';
import type { TTaskPresentationText } from '@dc/graphql/user/queries/taskPresentation';
import {
  textToolbarConfig,
  headerToolbarConfig,
} from '@dc/components/shared/TextEditor/EditorToolbars/editorToolbars';

import { usePresentationState } from '@shared/hooks/usePresentationState';

import ImageUpload from '../Shared/ImageUpload/ImageUpload';
import Links from '../Shared/Links/Links';
import NoFitMessage from '../Shared/NoFitMessage/NoFitMessage';

type Props = {
  contentStyle: string;
  handleEditorChange: (values: string, editedContentId: string) => void;
  shouldShowElement: (object: { type: string; id: string }) => boolean;
  getText: (id: string, texts: TTaskPresentationText[]) => TTaskPresentationText | undefined;
  texts: TTaskPresentationText[];
};

function AdminTasksPresentationBuilderSettingsElementsImageText({
  contentStyle,
  handleEditorChange,
  shouldShowElement,
  getText,
  texts,
}: Props) {
  const { handleUpdateSlide, isSaving, currentSlide, overflowingItems } = usePresentationBuilder();
  const { presentationDispatch } = usePresentationState();

  const handleOnBlurEvent = () => handleUpdateSlide();

  const firstText = getText('1', texts);
  const secondText = getText('2', texts);

  const shouldShowFirstText = firstText && shouldShowElement({ type: 'text', id: '1' });
  const shouldShowSecondText = secondText && shouldShowElement({ type: 'text', id: '2' });
  const shouldShowImage = shouldShowElement({ type: 'image', id: '1' });

  const dispatchPendingStatus = () =>
    presentationDispatch({ type: 'SET_PRESENTATION_HAS_PENDING_CHANGES', payload: true });

  return (
    <div className='animate-fadeDropIn'>
      {shouldShowImage && <ImageUpload contentId='1' showImagePositionActions={true} />}
      {shouldShowFirstText && (
        <SharedTextEditor
          key={firstText.contentId}
          contentStyle={contentStyle}
          data-testid='presentation-builder-description-input'
          disabled={isSaving}
          editorConfig={{
            ...firstText,
            onChange: (values) => handleEditorChange(values, firstText.contentId),
            onBlur: handleOnBlurEvent,
            onDirty: dispatchPendingStatus,
          }}
          id={firstText.contentId}
          label={firstText.type}
          toolbar={firstText.type === 'header' ? headerToolbarConfig : textToolbarConfig}
        />
      )}
      {shouldShowSecondText && (
        <>
          <SharedTextEditor
            key={secondText.contentId}
            contentStyle={contentStyle}
            data-testid='presentation-builder-description-input'
            disabled={isSaving}
            editorConfig={{
              ...secondText,
              onChange: (values) => handleEditorChange(values, secondText.contentId),
              onBlur: handleOnBlurEvent,
              onDirty: dispatchPendingStatus,
            }}
            id={secondText.contentId}
            label={secondText.type}
            toolbar={secondText.type === 'header' ? headerToolbarConfig : textToolbarConfig}
          />
          <NoFitMessage visible={!!overflowingItems && overflowingItems[secondText.contentId]} />
        </>
      )}
      {currentSlide?.content.links && (
        <Links links={currentSlide.content.links} shouldShowElement={shouldShowElement} />
      )}
    </div>
  );
}

export default AdminTasksPresentationBuilderSettingsElementsImageText;
