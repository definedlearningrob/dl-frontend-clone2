import { fireEvent } from '@testing-library/react';

import { renderWithI18N } from '@dc/utils/test';

import { TextInput } from '@shared/components/TextInput/TextInput';

const renderInput = (props) => {
  const utils = renderWithI18N(<TextInput label='text-input' {...props} />);
  const input = utils.getByLabelText(/text-input/i);

  return { ...utils, input };
};

describe('SharedTextInput', () => {
  it('renders correctly', () => {
    const { input } = renderInput();

    expect(input).toBeInTheDocument();
  });

  it('displays placeholder correctly', () => {
    const { getByPlaceholderText, rerender } = renderInput({
      placeholder: 'test',
    });

    let placeholderText = 'test';

    expect(getByPlaceholderText(placeholderText)).toBeInTheDocument();

    placeholderText = 'name';

    rerender(<TextInput label='text-input' placeholder={placeholderText} />);

    expect(getByPlaceholderText(placeholderText)).toBeInTheDocument();
  });

  it('displays proper value', () => {
    const { input } = renderInput();

    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'text value' } });

    expect(input).toHaveValue('text value');
  });

  it('displays error message when validation fails', async () => {
    const field = {
      name: 'test',
    };
    const { container } = renderInput({ errorMessage: 'error', field });

    expect(container).toHaveTextContent(/error/i);
  });
});
