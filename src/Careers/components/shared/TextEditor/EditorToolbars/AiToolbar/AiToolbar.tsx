import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Import icons
import { ReactComponent as ArrowDown } from '@dc/assets/icons/arrow_down.svg';
import { ReactComponent as ArrowUp } from '@dc/assets/icons/arrow_up.svg';
import { ReactComponent as BookA } from '@dc/assets/icons/book_outlined.svg';
import { ReactComponent as BookOpenText } from '@dc/assets/icons/book_opened.svg';
import { ReactComponent as Sparkles } from '@dc/assets/icons/sparkles.svg';

import { Tooltip } from '@shared/components/Tooltip/Tooltip';
import SharedIcon from '@shared/components/Icon/Icon';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

interface AIAssistToolbarProps {
  onOptionSelect: (option: string) => void;
  editorRef: React.RefObject<any>;
  isLoading: boolean;
}

export const AIAssistToolbar: React.FC<AIAssistToolbarProps> = ({
  onOptionSelect,
  editorRef,
  isLoading,
}: AIAssistToolbarProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0 });
  const initialized = editorRef?.current?.editor?.initialized;
  const { t } = useTranslation();

  const options = [
    {
      icon: <SharedIcon icon={<ArrowUp />} size='sm' />,
      label: t('aiToolbar.differentiateUp'),
      action: 'DIFF_UP',
      description: t('aiToolbar.prompts.DIFF_UP'),
    },
    {
      icon: <SharedIcon icon={<ArrowDown />} size='sm' />,
      label: t('aiToolbar.differentiateDown'),
      action: 'DIFF_DOWN',
      description: t('aiToolbar.prompts.DIFF_DOWN'),
    },
    {
      icon: <SharedIcon icon={<BookA />} size='sm' />,
      label: t('aiToolbar.simplifyVocabulary'),
      action: 'DECREASE_LEVEL',
      description: t('aiToolbar.prompts.DECREASE_LEVEL'),
    },
    {
      icon: <SharedIcon icon={<BookOpenText />} size='sm' />,
      label: t('aiToolbar.enhanceVocabulary'),
      action: 'INCREASE_LEVEL',
      description: t('aiToolbar.prompts.INCREASE_LEVEL'),
    },
    {
      icon: <SharedIcon icon={<Sparkles />} size='sm' />,
      label: t('aiToolbar.newIdea'),
      action: 'NEW_IDEA',
      description: t('aiToolbar.prompts.NEW_IDEA'),
    },
  ];

  const updateToolbarPosition = () => {
    const editor = editorRef.current?.editor;
    if (editor) {
      const selectedText = editor.selection.getContent({ format: 'text' });
      const hasSelection = !!selectedText?.trim().length;

      if (hasSelection) {
        const selection = editor.selection.getRng();
        const selectionRect = selection.getBoundingClientRect();
        const lineHeight = getComputedStyle(editorRef.current.elementRef.current).lineHeight;

        // Calculate position relative to the editor
        setPosition({
          top: selectionRect.bottom + parseFloat(lineHeight) * 2 + 45, // 5px gap below selection
        });
      }

      setIsVisible(hasSelection);
    }
  };

  useEffect(() => {
    const editor = editorRef.current?.editor;
    if (editor) {
      editor.on('SelectionChange', updateToolbarPosition);
      editor.on('NodeChange', updateToolbarPosition);

      return () => {
        editor.off('SelectionChange', updateToolbarPosition);
        editor.off('NodeChange', updateToolbarPosition);
      };
    }
  }, [initialized]);

  if (!isVisible) return null;

  return (
    <div
      className='absolute z-[71] bg-white border left-1/2 -translate-x-1/2 border-blue-300 shadow-lg rounded-sm min-w-fit max-w-max w-[calc(100%-2rem)]'
      data-testid='ai-assist-toolbar'
      style={{
        top: `${position.top}px`,
      }}>
      <div className='flex items-center gap-xs p-xs flex-wrap justify-center'>
        {options.map((option) => (
          <Tooltip key={option.action} message={option.description}>
            <button
              key={option.action}
              className='flex flex-col items-center justify-center px-xs py-xxs hover:bg-blue-50 rounded-sm transition-colors'
              data-testid={`ai-assist-${option.action}`}
              disabled={isLoading}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onOptionSelect(option.action);
              }}>
              {option.icon}
              <span className='text-xs mt-1 text-blue-600 font-medium'>{option.label}</span>
            </button>
          </Tooltip>
        ))}
        {isLoading && (
          <div className='absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center bg-white bg-opacity-50 rounded-md'>
            <SharedLoadingSpinner size='small' />
          </div>
        )}
      </div>
    </div>
  );
};
