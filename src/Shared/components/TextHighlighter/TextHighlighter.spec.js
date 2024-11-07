import { render } from '@testing-library/react';

import TextHighlighter from '@shared/components/TextHighlighter/TextHighlighter';

const renderTextHighlighter = (filterText, toHighlightText) =>
  render(
    <TextHighlighter text={filterText}>
      <span className='highlightible'>{toHighlightText}</span>
    </TextHighlighter>
  );

describe('TextHighlighter', () => {
  it('modifies text content properly', () => {
    const { getByTestId } = renderTextHighlighter('Bru', 'Bruce Wayne');

    expect(getByTestId(/text-highlighter/)).toMatchInlineSnapshot(`
      <span
        data-testid="text-highlighter"
      >
        <span
          class="highlightible"
        >
          <span
            class="highlighterDark"
          >
            Bru
          </span>
          ce Wayne
        </span>
      </span>
    `);
  });

  it('modifies text content properly ignoring case', () => {
    const { getByTestId } = renderTextHighlighter('Wa', 'Bruce Wayne');

    expect(getByTestId(/text-highlighter/)).toMatchInlineSnapshot(`
      <span
        data-testid="text-highlighter"
      >
        <span
          class="highlightible"
        >
          Bruce 
          <span
            class="highlighterDark"
          >
            Wa
          </span>
          yne
        </span>
      </span>
    `);
  });
});
