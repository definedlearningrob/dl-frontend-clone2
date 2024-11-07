import { render, screen, act, fireEvent } from '@testing-library/react';
import { useTranslation } from 'react-i18next';

import { AIAssistToolbarWrapper } from '@dc/components/shared/TextEditor/EditorToolbars/AiToolbar/AiToolbarWrapper';

import { AI_PROMPTS } from '@shared/resources/constants';

// Mock i18next with only the labels, prompts come from constants
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) =>
      ({
        'aiToolbar.differentiateUp': 'Differentiate Up',
        'aiToolbar.differentiateDown': 'Differentiate Down',
        'aiToolbar.simplifyVocabulary': 'Simplify Vocabulary',
        'aiToolbar.enhanceVocabulary': 'Enhance Vocabulary',
        'aiToolbar.newIdea': 'New Idea',
      }[key]),
  }),
}));

describe('AIAssistToolbarWrapper', () => {
  const originalFetch = global.fetch;
  const selectedText = 'Selected Text for Testing';
  const { t } = useTranslation();

  beforeAll(() => {
    window.getComputedStyle = jest.fn().mockImplementation(() => ({
      lineHeight: '14px',
    }));

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: { content: 'AI generated content' } }),
      })
    );

    process.env.VITE_DC_API_HOST = 'http://test-api';
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  const setupEditor = () => {
    const mockEditorRef = {
      current: {
        elementRef: {
          current: document.createElement('div'),
        },
        editor: {
          getContent: jest.fn(() => 'Test content'),
          selection: {
            getContent: jest.fn(() => selectedText),
            getRng: jest.fn(() => ({
              getBoundingClientRect: () => ({
                top: 100,
                left: 100,
                width: 100,
                height: 20,
              }),
            })),
          },
          on: jest.fn((event, callback) => {
            if (event === 'SelectionChange') {
              mockEditorRef.current.editor.selectionChangeCallback = callback;
            }
          }),
          off: jest.fn(),
        },
      },
    };

    return mockEditorRef;
  };

  const aiOptions = [
    { action: 'DIFF_UP', label: t('aiToolbar.differentiateUp') },
    { action: 'DIFF_DOWN', label: t('aiToolbar.differentiateDown') },
    { action: 'DECREASE_LEVEL', label: t('aiToolbar.simplifyVocabulary') },
    { action: 'INCREASE_LEVEL', label: t('aiToolbar.enhanceVocabulary') },
    { action: 'NEW_IDEA', label: t('aiToolbar.newIdea') },
  ];

  aiOptions.forEach(({ action, label }) => {
    it(`makes API request with correct prompt when ${label} button is clicked`, async () => {
      const mockEditorRef = setupEditor();
      render(<AIAssistToolbarWrapper editorRef={mockEditorRef} />);

      // Show toolbar
      await act(async () => {
        mockEditorRef.current.editor.selectionChangeCallback();
      });

      // Click the button
      const button = await screen.findByTestId(`ai-assist-${action}`);
      await act(async () => {
        fireEvent.click(button);
      });

      // Verify API call with correct prompt and selected text
      expect(global.fetch).toHaveBeenCalledWith(
        'http://test-api/api/careers/v1/generations',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
          body: expect.stringContaining(AI_PROMPTS[action]),
        })
      );

      // Verify selected text is included in the request
      const lastCall = global.fetch.mock.calls[global.fetch.mock.calls.length - 1];
      const requestBody = JSON.parse(lastCall[1].body);
      expect(requestBody.prompt).toContain(selectedText);
    });
  });

  it('shows when text is selected', async () => {
    const mockEditorRef = setupEditor();
    render(<AIAssistToolbarWrapper editorRef={mockEditorRef} />);

    await act(async () => {
      mockEditorRef.current.editor.selectionChangeCallback();
    });

    const aiToolbar = await screen.findByTestId('ai-assist-toolbar');
    expect(aiToolbar).toBeInTheDocument();
  });

  it('does not show initially', () => {
    const mockEditorRef = setupEditor();
    const { queryByTestId } = render(<AIAssistToolbarWrapper editorRef={mockEditorRef} />);
    expect(queryByTestId('ai-assist-toolbar')).not.toBeInTheDocument();
  });
});
