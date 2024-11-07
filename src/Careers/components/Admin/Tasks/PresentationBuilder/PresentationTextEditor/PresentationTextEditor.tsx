import SharedTextEditor from '@dc/shared/TextEditor/TextEditor';
import {
  headerToolbarConfig,
  textToolbarConfig,
} from '@dc/shared/TextEditor/EditorToolbars/editorToolbars';
import NoFitMessage from '@dc/components/Admin/Tasks/PresentationBuilder/Settings/Elements/Shared/NoFitMessage/NoFitMessage';
import { TTaskPresentationText } from '@dc/graphql/user/queries/taskPresentation';
import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';

import { usePresentationState } from '@shared/hooks/usePresentationState';

type Props = {
  text: TTaskPresentationText;
  handleEditorChange: (values: string, editedContentId: string) => void;
  contentStyle: string;
};

export const PresentationTextEditor = ({ contentStyle, text, handleEditorChange }: Props) => {
  const { presentationDispatch } = usePresentationState();
  const { handleUpdateSlide, isSaving, overflowingItems } = usePresentationBuilder();
  const dispatchPendingStatus = () =>
    presentationDispatch({ type: 'SET_PRESENTATION_HAS_PENDING_CHANGES', payload: true });

  return (
    <>
      <SharedTextEditor
        key={text.contentId}
        contentStyle={contentStyle}
        data-testid='presentation-builder-description-input'
        disabled={isSaving}
        editorConfig={{
          ...text,
          onChange: (values) => handleEditorChange(values, text.contentId),
          onBlur: () => handleUpdateSlide(),
          onDirty: dispatchPendingStatus,
        }}
        id={text.contentId}
        label={text.type}
        toolbar={text.type === 'header' ? headerToolbarConfig : textToolbarConfig}
      />
      {!(text.type === 'header') && <NoFitMessage visible={!!overflowingItems?.[text.contentId]} />}
    </>
  );
};
