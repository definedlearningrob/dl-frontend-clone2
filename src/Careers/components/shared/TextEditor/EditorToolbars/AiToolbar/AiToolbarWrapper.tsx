import React from 'react';
import { useState } from 'react';

import { AI_PROMPTS } from '@shared/resources/constants';
import { handleError } from '@shared/utils/handleError';

import { AIAssistToolbar } from './AiToolbar';

interface AIAssistToolbarWrapperProps {
  editorRef: React.RefObject<any>;
}

export const AIAssistToolbarWrapper: React.FC<AIAssistToolbarWrapperProps> = ({
  editorRef,
}: AIAssistToolbarWrapperProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAIAssist = async (action: string) => {
    const editor = editorRef.current?.editor;
    if (!editor) return;

    const selectedContent = editor.selection.getContent({ format: 'text' });
    if (selectedContent) {
      setIsLoading(true);
      try {
        const aiResponse = await generateAIResponse(selectedContent, action);

        if (aiResponse) {
          editor.selection.setContent(aiResponse);
        }
      } catch (errorMessage) {
        handleError(
          errorMessage instanceof Error ? errorMessage.message : (errorMessage as string)
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <AIAssistToolbar editorRef={editorRef} isLoading={isLoading} onOptionSelect={handleAIAssist} />
  );
};

const generateAIResponse = async (prompt: string, action: string): Promise<string> => {
  const actionPrompts = AI_PROMPTS;
  const fullPrompt = `${actionPrompts[action as keyof typeof actionPrompts]} ${prompt}`;

  try {
    const response = await fetch(`${import.meta.env.VITE_DC_API_HOST}/api/careers/v1/generations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: fullPrompt }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      handleError('Server response error:', errorData.error);

      return '';
    }

    const data = await response.json();

    return data.result;
  } catch (error) {
    handleError(
      'Error in generateAIResponse:',
      error instanceof Error ? error.message : 'Unknown error'
    );

    return '';
  }
};

// const getSelectedText = (): string => {
//   const selection = window.getSelection();

//   return selection ? selection.toString() : '';
// };

// const replaceSelectedText = (replacementText: string): void => {
//   const selection = window.getSelection();
//   if (selection && selection.rangeCount > 0) {
//     const range = selection.getRangeAt(0);
//     range.deleteContents();
//     range.insertNode(document.createTextNode(replacementText));
//   }
// };
