import SharedTextEditor from '@dc/shared/TextEditor/TextEditor';

export default {
  component: SharedTextEditor,
  title: 'Text Editor',
  parameters: {
    componentSubtitle: 'shared text editor with label',
  },
};

export const Default = () => (
  <SharedTextEditor editorConfig={{ onChange: () => {} }} label='Notes' />
);
