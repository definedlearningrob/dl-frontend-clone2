import { useRef, useState } from 'react';
/* eslint-disable camelcase */
import { Editor } from '@tinymce/tinymce-react';

import { defaultToolbarConfig } from '@dc/components/shared/TextEditor/EditorToolbars/editorToolbars';
import { ReactComponent as Sparkles } from '@dc/assets/icons/sparkles.svg';

import '@dc/components/shared/TextEditor/TextEditor.sass';
import '@dc/shared/TextEditor/TextEditor.sass';
import { ErrorMessage } from '@shared/components/ErrorMessage/ErrorMessage';
import { InputLabel } from '@shared/components/InputLabel/InputLabel';
import { Tooltip } from '@shared/components/Tooltip/Tooltip';
import SharedIcon from '@shared/components/Icon/Icon';

import { AIAssistToolbarWrapper } from './EditorToolbars/AiToolbar/AiToolbarWrapper';

type Props = {
  contentStyle?: string;
  disabled?: boolean;
  fontFamily?: string;
  editorConfig: {
    onChange: (content: string) => void;
    value: any;
    onBlur?: () => void;
    onDirty?: () => void;
  };
  errorMessage?: string | boolean;
  id?: string;
  isRequired?: boolean;
  label?: string;
  placeholder?: string;
  toolbar?: string;
  labelClass?: string;
  aiToolbar?: boolean;
};

function SharedTextEditor({
  aiToolbar = true,
  contentStyle,
  fontFamily = 'system-ui',
  toolbar,
  disabled,
  editorConfig: { onChange, value, onBlur, onDirty },
  errorMessage,
  id,
  isRequired,
  label,
  placeholder,
  ...attributes
}: Props) {
  const [isEditorReady, setIsEditorReady] = useState(false);

  const handleEditorChange = (content: string) => {
    onChange(content);
  };

  const toolbarToRender = toolbar || defaultToolbarConfig;
  const editorContentStyle = contentStyle
    ? contentStyle
    : `body * { margin: 0; font-family: ${fontFamily}; };`;

  const errorToDisplay = typeof errorMessage === 'string' ? errorMessage : undefined;

  const editorRef = useRef(null);

  return (
    <div className='relative'>
      <div className='text-editor' data-testid='text-editor' {...attributes}>
        <label className='flex flex-col gap-xs w-full'>
          {label && (
            <InputLabel isRequired={isRequired} isSmall={false}>
              {label}
              {aiToolbar && (
                <Tooltip message='Select text to view AI Assist toolbar'>
                  <span className='p-xs shadow-md no-underline rounded-full bg-secondary-200 text-xxs border-secondary-500 text-secondary-500 ml-xs border'>
                    <span className='mr-xxs inline-flex align-middle'>
                      <SharedIcon icon={<Sparkles />} size='xs' />
                    </span>
                    AI Assist
                  </span>
                </Tooltip>
              )}
            </InputLabel>
          )}
          <Editor
            ref={editorRef}
            disabled={disabled}
            id={id || label}
            init={{
              default_link_target: '_blank',
              content_style: editorContentStyle,
              license_key: 'gpl',
              link_assume_external_targets: 'https',
              menubar: false,
              plugins: [
                'advlist',
                'autolink',
                'lists',
                'link',
                'image',
                'charmap',
                'print',
                'preview',
                'anchor',
                'searchreplace',
                'visualblocks',
                'code',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'paste',
                'help',
                'wordcount',
                'textcolor',
                'autoresize',
              ],
              toolbar: toolbarToRender,
              placeholder: placeholder || 'Type here...',
              paste_as_text: true,
              fontsize_formats: `10pt 11pt 12pt 14pt 16pt 18pt 20pt 21pt 22pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt 110pt 120pt`,
              formats: {
                hilitecolor: {
                  inline: 'span',
                  classes: 'hilitecolor',
                  styles: {
                    backgroundColor: '%value',
                    boxShadow: '16px 0 0 %value, -16px 0 0 %value',
                  },
                },
              },
              setup: (editor) => {
                if (editorRef.current) {
                  (editorRef.current as any).editor = editor;
                }
                editor.on('init', () => {
                  setIsEditorReady(true);
                });
              },
            }}
            textareaName={label}
            tinymceScriptSrc='/node_modules/tinymce/tinymce.min.js'
            value={value}
            onBlur={onBlur}
            onDirty={onDirty}
            onEditorChange={handleEditorChange}
          />
          <ErrorMessage errorMessage={errorToDisplay} />
        </label>
      </div>
      {aiToolbar && isEditorReady && editorRef.current && (
        <AIAssistToolbarWrapper editorRef={editorRef} />
      )}
    </div>
  );
}

export default SharedTextEditor;
