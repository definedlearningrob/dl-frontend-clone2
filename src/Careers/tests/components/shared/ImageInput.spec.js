import { act } from 'react-dom/test-utils';
import { fireEvent } from '@testing-library/react';

import SharedImageInput from '@dc/shared/ImageInput/ImageInput';
import { renderWithI18N } from '@dc/utils/test';

const renderImageInput = (props) => {
  const utils = renderWithI18N(
    <SharedImageInput inputConfig={{}} label='image-input' {...props} />
  );
  const imageInput = utils.getByLabelText(/image-input/i);

  return { ...utils, imageInput };
};

describe('SharedImageInput', () => {
  it('renders placeholder when no value provided', () => {
    const { getByTestId } = renderImageInput();

    expect(getByTestId(/image-placeholder/)).toBeInTheDocument();
  });

  it('renders image when image value is provided', () => {
    const { queryByTestId } = renderImageInput({
      inputConfig: {
        value: {
          src: 'image-src',
        },
      },
    });

    expect(queryByTestId(/image-placeholder/)).not.toBeInTheDocument();
  });

  it('opens modal with image on input change', async () => {
    const { imageInput, queryByTestId } = renderImageInput({
      inputConfig: {
        onChange: jest.fn(),
      },
    });

    expect(queryByTestId(/modal-body/)).not.toBeInTheDocument();

    await act(async () => {
      await fireEvent.change(imageInput, {
        target: {
          files: [new Blob([], { type: 'image/png' })],
        },
      });
    });

    await act(() => Promise.resolve());

    expect(queryByTestId(/modal-body/)).toBeInTheDocument();
  });

  it('fire onChange image when modal accepted', async () => {
    const file = new Blob([], { type: 'image/png' });
    const onChange = jest.fn();

    const { imageInput, getByTestId } = renderImageInput({
      inputConfig: {
        onChange,
      },
    });

    await act(async () => {
      await fireEvent.change(imageInput, {
        target: {
          files: [file],
        },
      });
    });

    await act(() => Promise.resolve());

    const acceptButton = getByTestId(/accept-button/);

    fireEvent.click(acceptButton);

    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith({
      file: file,
      src: 'data:image/png;base64,',
    });
  });

  it('closes modal on reject button', async () => {
    const { imageInput, getByTestId, queryByTestId } = renderImageInput({
      inputConfig: {
        onChange: jest.fn(),
      },
    });

    await act(async () => {
      await fireEvent.change(imageInput, {
        target: {
          files: [new Blob([], { type: 'image/png' })],
        },
      });
    });

    await act(() => Promise.resolve());

    const rejectButton = getByTestId(/reject-button/);

    fireEvent.click(rejectButton);

    expect(queryByTestId(/modal-body/)).not.toBeInTheDocument();
  });
});
