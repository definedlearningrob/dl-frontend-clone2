import { render, fireEvent } from '@testing-library/react';

import SharedModal from '@shared/components/Modal/Modal';

describe('SharedModal', () => {
  it('renders modal parts properly', () => {
    const { getByTestId } = render(
      <SharedModal isOpen={true}>
        <SharedModal.Header />
        <SharedModal.Body />
        <SharedModal.Footer />
      </SharedModal>
    );

    expect(getByTestId(/modal-header/)).toBeInTheDocument();
    expect(getByTestId(/modal-body/)).toBeInTheDocument();
    expect(getByTestId(/modal-footer/)).toBeInTheDocument();
  });

  it('renders null when show is false', () => {
    const { queryByTestId } = render(
      <SharedModal isOpen={false}>
        <SharedModal.Header />
        <SharedModal.Body />
        <SharedModal.Footer />
      </SharedModal>
    );

    expect(queryByTestId(/modal-header/)).not.toBeInTheDocument();
    expect(queryByTestId(/modal-body/)).not.toBeInTheDocument();
    expect(queryByTestId(/modal-footer/)).not.toBeInTheDocument();
  });

  it('calls onModalClose on modal close click', () => {
    const onModalClose = jest.fn();

    const { getByTestId } = render(
      <SharedModal isOpen={true} onDismiss={onModalClose}>
        <SharedModal.Header />
      </SharedModal>
    );

    const closeButton = getByTestId(/modal-close-button/);
    fireEvent.click(closeButton);

    expect(onModalClose).toBeCalledTimes(1);
  });
});
