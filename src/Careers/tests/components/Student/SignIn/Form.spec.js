import { Formik } from 'formik';

import StudentSignInForm from '@dc/components/Student/SignIn/Form/Form';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';

const initialState = { session: { loginError: 'error' } };
const props = {
  errors: {
    domain: 'This field is required.',
    login: 'This field is required.',
    password: 'This field is required.',
  },
  touched: {
    domain: true,
    login: true,
    password: true,
  },
};

const renderStudentSignInForm = () => {
  const utils = renderWithRouterAndReduxProvider(
    <Formik>
      <StudentSignInForm {...props} />
    </Formik>,
    { initialState }
  );

  const form = utils.getByTestId(/student-signin-form/i);

  return { ...utils, form };
};

describe('StudentSignInForm', () => {
  it('renders correctly', () => {
    const { form } = renderStudentSignInForm();

    expect(form).toBeInTheDocument();
  });
});
