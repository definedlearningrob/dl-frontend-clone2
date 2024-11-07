import TextHighlighter from '@shared/components/TextHighlighter/TextHighlighter';

export default {
  component: TextHighlighter,
  title: 'Text Highlighter',
  parameters: {
    componentSubtitle: 'shared text highlighter with label',
  },
};

export const Default = () => (
  <TextHighlighter text='som'>
    <span className='highlightible'>Some text</span>
  </TextHighlighter>
);
