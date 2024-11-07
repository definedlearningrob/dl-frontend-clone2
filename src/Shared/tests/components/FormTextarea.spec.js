import { Formik } from 'formik';
import { waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithI18N } from '@dc/utils/test';

import SharedFormTextarea from '@shared/components/FormTextarea/FormTextarea';

const renderTextarea = (props) =>
  renderWithI18N(
    <>
      <Formik initialValues={{ testValue: '' }} onSubmit={() => {}}>
        <SharedFormTextarea label='textarea' name='testValue' {...props} />
      </Formik>
    </>
  );

describe('SharedTextarea', () => {
  it('renders correctly', () => {
    renderTextarea();
    const textarea = screen.getByRole('textbox', { label: 'textarea' });

    expect(textarea).toBeInTheDocument();
  });

  it('displays label and placeholder text correctly', () => {
    const props = { placeholder: 'test', label: 'textarea' };
    renderTextarea(props);

    expect(screen.getByLabelText(props.label)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(props.placeholder)).toBeInTheDocument();
  });

  it('displays value correctly', async () => {
    renderTextarea();
    const textarea = screen.getByRole('textbox', { label: 'textarea' });
    const value = 'text value';

    userEvent.paste(textarea, value);

    await waitFor(() => expect(textarea).toHaveValue(value));
  });
});
