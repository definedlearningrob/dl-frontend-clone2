import { Formik } from 'formik';

import StudentSignInWithAccessCodeForm from '@dc/components/Student/SignInWithAccessCode/Form/Form';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';

const initialState = { session: { loginError: 'error' } };
const props = {
  errors: {
    accessCode: 'This field is required.',
  },
  touched: {
    accessCode: true,
  },
};

const renderStudentSignInWithAccessCodeForm = () => {
  const utils = renderWithRouterAndReduxProvider(
    <Formik>
      <StudentSignInWithAccessCodeForm {...props} />
    </Formik>,
    { initialState }
  );

  const form = utils.getByTestId(/student-access-code-form/i);

  return { ...utils, form };
};

describe('StudentSignInWithAccessCodeForm', () => {
  it('renders correctly', () => {
    const { form } = renderStudentSignInWithAccessCodeForm();

    expect(form).toBeInTheDocument();
  });
});
