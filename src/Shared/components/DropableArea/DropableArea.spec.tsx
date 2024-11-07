import { fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithI18N } from '@dc/utils/test';

import SharedDropableArea from './DropableArea';

const renderDropableArea = (props = {}) =>
  renderWithI18N(<SharedDropableArea label='dropzone' value={[]} onDrop={() => {}} {...props} />);

describe('SharedDropableArea', () => {
  it('renders properly with default icon', async () => {
    renderDropableArea();

    const input = screen.getByLabelText('dropzone');

    expect(input).toBeInTheDocument();
  });

  it('renders properly with image icon', async () => {
    renderDropableArea({ assetType: 'image' });

    const input = screen.getByLabelText('dropzone');

    expect(input).toBeInTheDocument();
  });

  it('calls on drop after droping item', async () => {
    const onDropSpy = jest.fn();

    renderDropableArea({ onDrop: onDropSpy });

    const input = screen.getByLabelText('dropzone');
    fireEvent.drop(input);

    await waitFor(() => {
      expect(onDropSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('calls on drop after selecting item', async () => {
    const onDropSpy = jest.fn();

    renderDropableArea({ onDrop: onDropSpy });

    const input = screen.getByLabelText('dropzone');
    userEvent.upload(input, new File([''], ''));

    await waitFor(() => {
      expect(onDropSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('does not show clear when no value', async () => {
    renderDropableArea();

    const clearButton = screen.queryByRole('button', { name: 'Clear' });

    await waitFor(() => {
      expect(clearButton).not.toBeInTheDocument();
    });
  });

  it('calls on clear after clear click', async () => {
    const onClearSpy = jest.fn();

    renderDropableArea({
      previewUrl: 'test-url',
      onClear: onClearSpy,
      value: [new File([''], '')],
    });

    const clearButton = screen.getByRole('button', { name: 'Delete' });

    userEvent.click(clearButton);

    await waitFor(() => {
      expect(onClearSpy).toHaveBeenCalledTimes(1);
    });
  });
});
