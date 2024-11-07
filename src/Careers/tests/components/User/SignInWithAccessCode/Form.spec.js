import { Formik } from 'formik';

import UserSignInWithAccessCodeForm from '@dc/components/User/SignInWithAccessCode/Form/Form';
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

const renderUserSignInWithAccessCodeForm = () => {
  const utils = renderWithRouterAndReduxProvider(
    <Formik>
      <UserSignInWithAccessCodeForm {...props} />
    </Formik>,
    { initialState }
  );
  const form = utils.getByTestId(/user-access-code-form/i);

  return { ...utils, form };
};

describe('UserSignInWithAccessCodeForm', () => {
  it('renders correctly', () => {
    const { form } = renderUserSignInWithAccessCodeForm();

    expect(form).toBeInTheDocument();
  });
});
