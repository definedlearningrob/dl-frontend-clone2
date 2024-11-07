import { render } from '@testing-library/react';

import SharedTextEditor from '@dc/shared/TextEditor/TextEditor';

const renderTextEditor = (props) => {
  const utils = render(
    <SharedTextEditor
      editorConfig={{ onChange: (value) => value }}
      label='text-editor'
      {...props}
    />
  );
  const textarea = utils.getByLabelText(/text-editor/i);

  return { ...utils, textarea };
};

describe('SharedTextEditor', () => {
  it('renders correctly', () => {
    const { textarea } = renderTextEditor();

    expect(textarea).toBeInTheDocument();
  });
});
