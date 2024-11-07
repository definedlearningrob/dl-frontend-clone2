import { fireEvent } from '@testing-library/react';

import SharedUploadInput from '@dc/shared/UploadInput/UploadInput';
import { renderWithI18N } from '@dc/utils/test';

const renderUploadInput = (props) => {
  const utils = renderWithI18N(<SharedUploadInput label='file-input' {...props} />);
  const uploadInput = utils.getByLabelText(/file-input/i);

  return { ...utils, uploadInput };
};

describe('SharedUploadInput', () => {
  it('renders correctly passed value with correct icons', () => {
    const { getAllByTestId } = renderUploadInput({
      inputConfig: {
        value: [
          {
            name: 'First file',
            type: 'video',
          },
          {
            name: 'Second file',
            type: 'document',
          },
          {
            name: 'Third file',
            type: 'pdf',
          },
          {
            name: 'Fourth file',
            type: 'image',
          },
          {
            name: 'Fifth file',
            type: 'unknown',
          },
        ],
      },
    });

    expect(getAllByTestId(/file-name/)[0]).toHaveTextContent('First file');
    expect(getAllByTestId(/file-name/)[1]).toHaveTextContent('Second file');
    expect(getAllByTestId(/file-name/)[2]).toHaveTextContent('Third file');
    expect(getAllByTestId(/file-name/)[3]).toHaveTextContent('Fourth file');
    expect(getAllByTestId(/file-name/)[4]).toHaveTextContent('Fifth file');
  });

  it('triggers on change with proper params', () => {
    const onChange = jest.fn();

    const { getByTestId } = renderUploadInput({
      inputConfig: {
        value: [],
        onChange,
      },
    });

    const input = getByTestId(/input/);

    const files = [
      {
        name: 'First name',
      },
      {
        name: 'Second name',
      },
    ];

    fireEvent.change(input, {
      target: {
        files,
      },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(files);
  });

  it('triggers onChange with proper params on clear click', () => {
    const onChange = jest.fn();

    const { getAllByTestId } = renderUploadInput({
      inputConfig: {
        onChange,
        value: [
          {
            name: 'First file',
            type: 'video',
          },
          {
            name: 'Second file',
            type: 'document',
          },
        ],
      },
    });
    const secondFileClear = getAllByTestId(/file-clear/)[1];

    fireEvent.click(secondFileClear);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith([
      {
        name: 'First file',
        type: 'video',
      },
    ]);
  });
});
