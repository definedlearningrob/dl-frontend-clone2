import { t } from 'i18next';

import SharedTextEditor from '@dc/shared/TextEditor/TextEditor';
import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';
import { TTaskPresentationText } from '@dc/graphql/user/queries/taskPresentation';
import {
  textToolbarConfig,
  headerToolbarConfig,
} from '@dc/components/shared/TextEditor/EditorToolbars/editorToolbars';

import { usePresentationState } from '@shared/hooks/usePresentationState';
import { Select } from '@shared/components/Select';

import Links from '../Shared/Links/Links';

type Props = {
  contentStyle: string;
  handleEditorChange: (values: string, editedContentId: string) => void;
  shouldShowElement: (object: { type: string; id: string }) => boolean;
  texts: TTaskPresentationText[];
  getText: (id: string, texts: TTaskPresentationText[]) => TTaskPresentationText | undefined;
};

function AdminTasksPresentationBuilderSettingsElementsTitle({
  contentStyle,
  handleEditorChange,
  shouldShowElement,
  texts,
  getText,
}: Props) {
  const { handleUpdateSlide, isSaving, currentSlide } = usePresentationBuilder();
  const { presentationDispatch } = usePresentationState();

  const handleOnBlurEvent = () => handleUpdateSlide();

  const firstText = getText('1', texts);

  const shouldShowFirstText = firstText && shouldShowElement({ type: 'text', id: '1' });

  const dispatchPendingStatus = () =>
    presentationDispatch({ type: 'SET_PRESENTATION_HAS_PENDING_CHANGES', payload: true });

  const renderEditor = (text: TTaskPresentationText) => (
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
  );

  const positionOptions = [
    { label: t('admin.tasks.presentation.center'), value: 'center' },
    { label: t('admin.tasks.presentation.topRight'), value: 'top-right' },
    { label: t('admin.tasks.presentation.topLeft'), value: 'top-left' },
    { label: t('admin.tasks.presentation.bottomRight'), value: 'bottom-right' },
    { label: t('admin.tasks.presentation.bottomLeft'), value: 'bottom-left' },
  ];

  const selectedValue = positionOptions.find((option) => option.value === firstText?.style);

  return (
    <div className='animate-fadeDropIn'>
      {shouldShowFirstText && (
        <>
          {renderEditor(firstText)}
          <Select
            defaultValue={selectedValue}
            label={t('admin.tasks.presentation.position')}
            options={positionOptions}
            onChange={(option) =>
              handleUpdateSlide(null, {
                textItems: [
                  {
                    contentId: firstText.contentId,
                    type: firstText.type,
                    value: firstText.value,
                    style: option?.value,
                  },
                ],
              })
            }
          />
        </>
      )}
      {currentSlide?.content.links && (
        <Links links={currentSlide.content.links} shouldShowElement={shouldShowElement} />
      )}
    </div>
  );
}

export default AdminTasksPresentationBuilderSettingsElementsTitle;
