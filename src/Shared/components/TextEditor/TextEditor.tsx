/* eslint-disable camelcase */
import { HTMLProps, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import cx from 'classnames';

import { AIAssistToolbarWrapper } from '@dc/components/shared/TextEditor/EditorToolbars/AiToolbar/AiToolbarWrapper';
import { ReactComponent as Sparkles } from '@dc/assets/icons/sparkles.svg';

import { Tooltip } from '@shared/components/Tooltip/Tooltip';
import SharedIcon from '@shared/components/Icon/Icon';

import styles from './TextEditor.module.sass';

export type Props = Omit<HTMLProps<HTMLDivElement>, 'size'> & {
  defaultToolbarType?: boolean;
  onChange: (value: string) => void;
  value: string;
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  size?: 'sm' | 'md';
  aiToolbar?: boolean;
};

function SharedTextEditor({
  aiToolbar = true,
  defaultToolbarType = true,
  onChange,
  errorMessage,
  label,
  placeholder,
  value,
  size = 'md',
  ...attributes
}: Props) {
  const [isEditorReady, setIsEditorReady] = useState(false);

  const handleEditorChange = (content: string) => {
    onChange(content);
  };

  const defaultToolbar = `undo redo | formatselect | bold italic backcolor |
    alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | 
    bullist numlist outdent indent | removeformat | code`;

  const announcementsToolbar = `undo redo | formatselect | bold italic backcolor |
    alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |
    removeformat | link unlink `;

  const labelClasses = cx('text-font-secondary capitalize', {
    'text-sm': size === 'md',
    'text-xs': size === 'sm',
  });

  const editorRef = useRef(null);

  return (
    <div className='relative'>
      <div
        className={cx(
          styles.editorWrapper,
          'flex flex-col gap-xs items-start text-font-primary w-full mb-sm'
        )}
        data-testid='text-editor'
        {...attributes}>
        {label && (
          <label className={labelClasses} htmlFor={label}>
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
          </label>
        )}
        <Editor
          ref={editorRef}
          id={label}
          init={{
            license_key: 'gpl',
            menubar: false,
            plugins: [
              'advlist',
              'autolink',
              'lists link',
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
              'code',
              'help',
              'wordcount',
            ],
            content_style:
              '.mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before { color: hsl(227, 19%, 74%) }',
            toolbar: defaultToolbarType ? defaultToolbar : announcementsToolbar,
            toolbar_mode: 'floating',
            placeholder: placeholder || 'Type here...',
            paste_as_text: true,
            formats: {
              hilitecolor: {
                inline: 'span',
                classes: 'hilitecolor',
                styles: {
                  backgroundColor: '%value',
                },
              },
            },
            setup: (editor) => {
              // Store the editor instance directly
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
          onEditorChange={handleEditorChange}
        />
        {errorMessage && (
          <div className='input-error-message text-xxs text-danger-600'>{errorMessage}</div>
        )}
      </div>
      {aiToolbar && isEditorReady && editorRef.current && (
        <AIAssistToolbarWrapper editorRef={editorRef} />
      )}
    </div>
  );
}

export default SharedTextEditor;
